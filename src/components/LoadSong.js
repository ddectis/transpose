import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import mammoth from 'mammoth'

const LoadSong = props =>{

    const [docData, setDocData] = useState('');
    let doc

    useEffect(() =>{
        fetch('/songs/Ace - sign.docx')
            .then(response => response.blob())
            .then(blob => mammoth.convertToHtml({ arrayBuffer: blob }))
            .then(result => setDocData(result.value));
    }, [])

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

    return (
        <div>
            <p>Load Song...</p>
            <button onClick={() => parseHtml()}>Load</button>
            {/* <div>
                {docData}
            </div> */}
            
            <div>{parseHtml()}</div>
        </div>
    )
}

export default LoadSong