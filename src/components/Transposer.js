import { Noto_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import GetCurrentNote from './GetCurrentNote'

const Transposer = props =>{

    //look up values to convert a parsed note string to an array index value
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    let useSharps = true
    //const originalNotesArray = ([...notesArray])

    const transposeNotesArray = transposeValue =>{
        console.log("transposing " + transposeValue)
        
        //chords are bold, which comes through as "strong". Put them all into a NodeList
        const strongElements = document.querySelectorAll('strong')
        console.log(strongElements)

        let currentNoteIndex = 0
        
        //loop over each of the lines of chords in strongElements
        for (let j = 0; j < strongElements.length; j++){
            let i = 0
            console.log(strongElements[j].innerText)
            console.log("i: " + i)
            const current = strongElements[j].innerText.split(' ')
            console.log("Current: ", current)
            for (i = 0; i < current.length; i++){ //loop over each chord in the current chord line
                console.log("Current Length: " + current.length)
                currentNoteIndex = GetCurrentNote(current[i])
                if (currentNoteIndex !== -1){
                    console.log("inner loop iteration: " + i)
                    //console.log("current note index coming in: " + currentNoteIndex)
                    currentNoteIndex += transposeValue //val = 1 / -1 / 0 for up/down/redraw
                    //console.log("current note index going out : " + currentNoteIndex)
                    
                    //check to ensure value is within bounds
                    if (transposeValue !== 0){
                        if (currentNoteIndex === notesSharp.length){
                            currentNoteIndex = 0
                        }
                        if (currentNoteIndex < 0){
                            currentNoteIndex = notesSharp.length - 1
                        }
                    }
                    
                    let remainder = ''
        
                    //this is meant to capture tonality / modifications after the pitch tone
                    if (current.length > 1){ //if the current note has more than 1 character
                        console.log("Current: " + current[1])
                        if (current[1] === '#' || current[1] === 'b' ){ //and if the escond character is # or b
                            remainder = current[i].slice(2) //then we need to take everything after the first 2 characters
                        } else {
                            remainder = current[i].slice(1) //and if you have more than 1 char and the 2nd isn't # or b, take everythign after the first
                        }
                        
                        console.log("Remainder: " + remainder)
                    }
                    
                    if (remainder[0] === "#" || remainder[0] === "b"){
    
                        remainder = remainder.substring(1)
                        console.warn("# in wrong place, slicing new remainder: " + remainder)
                    }
        
                    //parse out a new note value from either the sharps or flats array
                    if (useSharps){
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
            console.log("Current At the end: ", current)
            current.forEach(note =>{
                strongElements[j].innerHTML += `<span>${note} </span>`
            })
        }

        //console.log(notesArray)
        //console.log("Original: ", originalNotesArray)
        
    }

    const toggleSharpsFlats = () =>{
        useSharps = !useSharps
        transposeNotesArray(0)
    }

    return (
        <div>
            <h2>Transposer</h2>
            <div>
                <button id='transpose-up' onClick={() => transposeNotesArray(1)}>+1</button>
                <button id='transpose-down' onClick={() => transposeNotesArray(-1)}>-1</button>    
            </div>
            
            Toggle
            <button id='toggle-sharps' onClick={() => toggleSharpsFlats()}># / ♭</button>
        </div>
        
    )
}

export default Transposer

