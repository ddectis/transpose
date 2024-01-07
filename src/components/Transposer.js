import { Noto_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import GetCurrentNote from './GetCurrentNote'
import styles from '@/styles/Transposer.module.css'
import ChordSpacing from '@/components/ChordSpacing'
import MenuButton from "./MenuButton";
import FontSizer from "./FontSizer";
import LineSpacer from "./LineSpacer";

const Transposer = ({ isSongSelected, stepsTransposed, setStepsTransposed }) => {

    //look up values to convert a parsed note string to an array index value
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    let useSharps = true
    //const originalNotesArray = ([...notesArray])

    const [isMenuOpen, setIsMenuOpen] = useState(true)


    useEffect(() => {
    }, [isMenuOpen])

    // useEffect(() => {
    //     transposeNotesArray(1)
    //     transposeNotesArray(-1)
    // }, [isSongSelected])

    const toggleMenu = () => {
        console.log("toggle menu click")
        setIsMenuOpen(!isMenuOpen)
    }


    const transposeNotesArray = transposeValue => {
        if (isSongSelected) {
            console.log("transposing " + transposeValue)

            //MOST of the chords are bold, which comes through as "strong". Put them all into a NodeList
            const boldElements = document.querySelectorAll('strong')
            //some of the old song files have the chords in headings instead of just in bold elements, so they come through as h1. 
            const headingElements = document.querySelectorAll('h1')
            //so we combine them
            const strongElements = [...boldElements, ...headingElements]
            //console.log(strongElements)

            let currentNoteIndex = 0

            //loop over each of the lines of chords in strongElements
            for (let j = 0; j < strongElements.length; j++) {
                let i = 0
                //console.log(strongElements[j].innerText)
                //console.log("i: " + i)
                const current = strongElements[j].innerText.split(' ')
                //console.log("Current: ", current)
                for (i = 0; i < current.length; i++) { //loop over each chord in the current chord line
                    //console.log("Current Length: " + current.length)
                    currentNoteIndex = GetCurrentNote(current[i])
                    if (currentNoteIndex !== -1) {
                        //console.log("inner loop iteration: " + i)
                        //console.log("current note index coming in: " + currentNoteIndex)
                        currentNoteIndex += transposeValue //val = 1 / -1 / 0 for up/down/redraw
                        //console.log("current note index going out : " + currentNoteIndex)

                        //check to ensure value is within bounds
                        if (transposeValue !== 0) {
                            if (currentNoteIndex === notesSharp.length) {
                                currentNoteIndex = 0
                            }
                            if (currentNoteIndex < 0) {
                                currentNoteIndex = notesSharp.length - 1
                            }
                        }

                        let remainder = ''
                        let slashBassNote = ''

                        //this is meant to capture tonality / modifications after the pitch tone
                        if (current[i].length > 1) { //if the current note has more than 1 character, then we might have a minor chord etc on our hands
                            console.log("Current: " + current[i])
                            if (current[i][1] === '#' || current[i][1] === 'b') { //but that 2nd character might be # or b 
                                remainder = current[i].slice(2) //and if it is, then the first 2 characters are pitch related, so we need to take everything after the first 2 characters
                            } else {
                                remainder = current[i].slice(1) //and if you have more than 1 char and the 2nd isn't # or b, take everythign after the first because you're looking at e.g. Am
                            }

                            //here we check for slash chords which will often be like F#/D but could be something like Gm/D i.e. the / is not always the first character in remainder
                            //although the part before the slash can be complex e.g. Gm, the part after the slash is always 1 char
                            if (remainder.includes('/')) {
                                //console.log("Slash chord detected!")
                                //then we need to split the remainder at the /
                                const splitRemainder = remainder.split('/')
                                //and then if we take the index 1 of the splitRemainder array, we'll get just the note after the slash
                                //console.log("Split Remainder: ", splitRemainder[1])
                                //then you'd need to get that index of that note after the slash that we didn't know about
                                let slashBaseNoteIndex = GetCurrentNote(splitRemainder[1])
                                //console.log("Index of Note under the slash: " + slashBaseNoteIndex)
                                //and ultimately we run a mini transpose function on the slashBassNote
                                //and match it back up using the sharps / flats array like we do down around line 110 for the main note
                                //and then create a remainder that includes the slash and the info after the slash
                                slashBaseNoteIndex += transposeValue
                                if (transposeValue !== 0) {
                                    if (slashBaseNoteIndex === notesSharp.length) {
                                        slashBaseNoteIndex = 0
                                    }
                                    if (slashBaseNoteIndex < 0) {
                                        slashBaseNoteIndex = notesSharp.length - 1
                                    }
                                }

                                if (useSharps) {
                                    slashBassNote = notesSharp[slashBaseNoteIndex]
                                } else {
                                    slashBassNote = notesFlat[slashBaseNoteIndex]
                                }
                                //console.log("Slash Bass Note: " + slashBassNote)
                                //console.log("Remainder just before adding slash: " + remainder)
                                const slashSplit = remainder.split('/')
                                //console.log("Slash Split: ", slashSplit)
                                remainder = slashSplit[0] + '/' + slashBassNote

                            }
                            //console.log("Remainder: " + remainder)
                        }

                        //this is to remove erroneous # or b which would show up sometimes
                        if (remainder[0] === "#" || remainder[0] === "b") {
                            remainder = remainder.substring(1)
                            //console.warn("# in wrong place, slicing new remainder: " + remainder)
                        }

                        //parse out a new note value from either the sharps or flats array
                        if (useSharps) {
                            //console.log(currentNoteIndex)
                            current[i] = notesSharp[currentNoteIndex] + remainder
                        } else {
                            current[i] = notesFlat[currentNoteIndex] + remainder
                        }
                    } else {
                        //no action was taken because -1 was returned i.e. the note was not found
                        //hopefully the character we just looked at was not a chord pitch character
                        //console.error("skipping because -1")
                    }
                }

                strongElements[j].innerHTML = ''
                //console.log("Current At the end: ", current)
                current.forEach(note => {
                    strongElements[j].innerHTML += `${note} `
                })
            }

            setStepsTransposed(stepsTransposed + transposeValue)

            //console.log(notesArray)
            //console.log("Original: ", originalNotesArray)
        }
    }

    const toggleSharpsFlats = () => {
        useSharps = !useSharps
        transposeNotesArray(0) //calling this method with 0 just redraws the notes, swapping any # with b enharmonic
    }

    return (

        <div className={`${styles.outerContainer} ${isMenuOpen ? styles.up : ''}`}>

            <div className={`${styles.innerContainer} ${styles.top}`}>
                <div className={`${styles.transposeSteps}`}>
                    <div>Transpose {stepsTransposed} {stepsTransposed === 1 ? 'step' : 'steps'}</div>
                </div>
                <div className={`${styles.buttonHolder}`}>
                    <button id='transpose-up' onClick={() => transposeNotesArray(1)}>+1</button>
                    <button id='transpose-down' onClick={() => transposeNotesArray(-1)}>-1</button>

                </div>

            </div>
            <div className={`${styles.innerContainer}`}>
                <smaller>Sharps / Flats</smaller>
                <div className={`${styles.buttonHolder}`}>
                    <button id='toggle-sharps' onClick={() => toggleSharpsFlats()}># / ♭</button>
                </div>

            </div>
            <div className={`${styles.innerContainer}`}>
                <FontSizer />
            </div>
            <div className={`${styles.innerContainer}`}>
                <LineSpacer />
            </div>
            <div className={`${styles.innerContainer} ${styles.bottom}`}>
                <ChordSpacing isSongSelected={isSongSelected} />
            </div>
            <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>


    )
}

export default Transposer


