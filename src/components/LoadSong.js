import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth'

const LoadSong = props =>{

    const [docData, setDocData] = useState(null);

    useEffect(() =>{
        fetch('/songs/Ace.docx')
            .then(response => response.blob())
            .then(blob => mammoth.convertToHtml({ arrayBuffer: blob }))
            .then(result => setDocData(result.value));
    }, [])



    return (
        <div>
            <p>Load Song...</p>
            <div dangerouslySetInnerHTML={{ __html: docData }} />
        </div>
    )
}

export default LoadSong