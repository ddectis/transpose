import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import mammoth from 'mammoth'
import ListSongs from './ListSongs';
import ClearSong from '@/components/ClearSong'
import { Noto_Sans_Ogham } from 'next/font/google';
import styles from '@/styles/LoadSong.module.css'
import RandomSong from './RandomSong';

const LoadSong = ({ isSongSelected, setIsSongSelected, stepsTransposed, setStepsTransposed, setArrayOfSongTitles, arrayOfSongTitles }) => {

    const [docData, setDocData] = useState('');
    const [songList, setSongList] = useState([])
    const [songTitle, setSongTitle] = useState('')

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
                setArrayOfSongTitles(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData when the component mounts
        fetchData();
    }, []); // The empty dependency array ensures the effect runs only on mount

    // method to load a path in /public/songs and then parse it into an HTML string
    const loadSong = path => {
        fetch(path)
            .then(response => response.blob())
            .then(blob => mammoth.convertToHtml({ arrayBuffer: blob }))
            .then(result => setDocData(result.value))
    }

    const parseHtml = () => {
        if (docData) {
            //Parse HTML string to DOM object
            const parser = new DOMParser()
            doc = parser.parseFromString(docData, 'text/html')
            //console.log(doc.body)
            const strongElements = doc.querySelectorAll('strong') //all of the chords are bold, bold comes through as 'strong', here we grab all of these elements and put them in a node list
            //console.log(strongElements)

            strongElements.forEach((element, index) => { //this might be superfluous? Not using this currently
                element.id = `strong-${index}` //the ID is not actually used
            })

            const manipulatedHtml = doc.body.innerHTML

            return parse(manipulatedHtml) //parse parses it back from a DOM object to an HTML string
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const selectSong = song => {
        const path = `/songs/${song}.docx`
        const testPath = `/songs/Lynyrd Skynyrd - Simple Man(1).docx`
        console.log(path)
        loadSong(path)
        setIsSongSelected(true)
        setSongTitle(song)
        scrollToTop()
    }

    const clearSong = () => {
        console.log("Clear Song")
        setDocData(null)
        setIsSongSelected(false)
        setSongTitle('')
        setStepsTransposed(0)

    }

    return (
        <div className={styles.wide}>
            <RandomSong
                        arrayOfSongTitles={arrayOfSongTitles}
                        selectSong={selectSong}
                    />
            {isSongSelected ? false :
                <div className={styles.wide}>
                    
                    <ListSongs
                        songList={songList}
                        selectSong={selectSong}
                    />
                </div>

            }
            <ClearSong
                clearSong={clearSong}
                isSongSelected={isSongSelected}
            />
            <div className={styles.songTitle}>{songTitle}</div>
            <div className={styles.songHolder}>{parseHtml()}</div>
        </div>
    )
}

export default LoadSong