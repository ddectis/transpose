import { Noto_Sans } from "next/font/google";
import { useState, useEffect } from "react";

const Transposer = props =>{

    //eventually notesArray will be built off of the import from the docx file
    const [notesArray, setNotesArray] = useState([])
    const [originalNotesArray, setOriginalNotesArray] = useState([])
    const [notesElement, setNotesElement] = useState()

    useEffect(() =>{
        const element = document.getElementById('note')
        const receivedNotes = element.innerText.split(' ')
        setNotesArray(receivedNotes)
        setNotesElement(element)
    }, [])

    useEffect(() => {
        // Set the initial value of originalNotesArray after the initial render
        setOriginalNotesArray([...notesArray]);
      }, [notesArray]); // Depend on notesArray to capture its initial value
        
    
    //look up values to convert a parsed note string to an array index value
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    let useSharps = true
    //const originalNotesArray = ([...notesArray])

    const transposeNotesArray = transposeValue =>{
        console.log("transposing " + transposeValue)
        
        const strongElements = document.querySelectorAll('strong')
        console.log(strongElements)
        //next up is to make a group of all of the <strong> elements 
        //and then loop through that
        //

        let currentNoteIndex = 0
        
        //console.log(notesArray)
        for (let j = 0; j < strongElements.length; j++){
            let i = 0
            console.log(strongElements[j].innerText)
            console.log("i: " + i)
            const current = strongElements[j].innerText.split(' ')
            console.log("Current: ", current)
            for (i = 0; i < current.length; i++){
                console.log("Current Length: " + current.length)
                currentNoteIndex = getCurrentNote(current[i])
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
                        currentNoteIndex = notesSharp.length -1
                    }
                }
                
                let remainder = ''
    
                //this is meant to capture tonality / modifications after the pitch tone
                if (current.length > 1){ //if the current note has more than 1 character
                    console.log("+1: " + current[1])
                    if (current[1] === '#' || current[1] === 'b' ){ //and if the escond character is # or b
                        remainder = current[i].slice(2) //then we need to take everything after the first 2 characters
                    } else {
                        remainder = current[i].slice(1) //and if you have more than 1 char and the 2nd isn't # or b, take everythign after the first
                    }
                    
                    console.log("Remainder: " + remainder)
                }
                
    
                //parse out a new note value from either the sharps or flats array
                if (useSharps){
                    //console.log(currentNoteIndex)
                    current[i] = notesSharp[currentNoteIndex] + remainder
                } else {
                    current[i] = notesFlat[currentNoteIndex] + remainder
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

    //helper method to parse a string that represents a note into a index value
    const getCurrentNote = note =>{
        let noteIndex = null
        let pitch = ''
        //this is the area that needs to be improved
        //you can't just take the first character, because sometimes you need
        //to see the second character if it's sharp or flat
        //basically look to see if note is > 1 char
        //if so, then check if the 2nd character is # or b
        //if so, then map those 2 characters to the term to search for
        //otherwise, just take the first character
        if(note.length > 1){
            if (note[1] === '#' || note[1] === 'b'){
                pitch = note.slice(0,2)
            }else {
                pitch = note[0]
            }
        } else {
            pitch = note[0]
        }
        
        //console.log("Pitch: " + pitch)
        for (let i = 0; i < notesSharp.length; i++){
            if (notesSharp[i] === pitch){
                return i
            }
            if (notesFlat[i] === pitch){
                return i
            }
        }

        return 0
    }

    const toggleSharpsFlats = () =>{
        useSharps = !useSharps
        transposeNotesArray(0)
    }

    return (
        <div>
            <h1>Placeholder</h1>
            <p id="note">F Cmaj7 G Am</p>
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

