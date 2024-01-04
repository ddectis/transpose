import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import mammoth from 'mammoth'
import { Noto_Sans_Ogham } from 'next/font/google';


const LoadSong = props =>{

    const [docData, setDocData] = useState('');
    const [songList, setSongList] = useState([])
    const bigDir = '/songs/Ace of Bass - I saw the Sign.docx'
    const smallDir = '/songs/Ace - Sign.docx'
    const t = '/songs/B.docx'
    const ccr = '/songs/CCR - Midnight Special.docx'
    let doc

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch songs.json
            const response = await fetch('/songs.json');
            
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            // Parse the JSON data
            const data = await response.json();
    
            // Set the songList state
            setSongList(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call fetchData when the component mounts
        fetchData();
      }, []); // The empty dependency array ensures the effect runs only on mount


    const loadSong = path =>{
        
        fetch(path)
            .then(response => response.blob())
            .then(blob => mammoth.convertToHtml({ arrayBuffer: blob }))
            .then(result => setDocData(result.value))
            
    }

    const parseHtml = () =>{
        if (docData){
            //Parse HTML string to DOM object
            const parser = new DOMParser()
            doc = parser.parseFromString(docData, 'text/html')
            //console.log(doc.body)
            const strongElements = doc.querySelectorAll('strong')
            //console.log(strongElements)
            strongElements.forEach((element, index) => {
                element.id = `strong-${index}`
            })

            const manipulatedHtml = doc.body.innerHTML

            return parse(manipulatedHtml)
        }
    }

    const selectSong = song => {
        const path = `/songs/${song}.docx`
        console.log(path)
        loadSong(path)
    }

    const printSongList = () =>{
        if (songList){
            console.log(songList)
            return (
                <div>
                    {songList.map(song =>{
                        return <button key={song} onClick={() => {selectSong(song)}}>{song}</button>
                    })}
                </div>
            )
        }
        
    }

    return (
        <div>
            <p>Load Song...</p>
            <button onClick={() => loadSong()}>Load</button>

            <div>{printSongList()}</div>
            
            <div>{parseHtml()}</div>
        </div>
    )
}

export default LoadSong