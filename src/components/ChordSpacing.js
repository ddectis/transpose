import { Vidaloka } from "next/font/google"

const ChordSpacing = props =>{
    
    const changeWordSpacing = value =>{
        console.log("change spacing: " + value)
        const strongElements = document.querySelectorAll('strong')
        console.log(strongElements)
        let computedStyle = window.getComputedStyle(strongElements[0])
        let wordSpacing = computedStyle.wordSpacing.split('p') //letter spacing returns as ##px, thus we split at p
        wordSpacing = parseInt(wordSpacing) + value
        console.log("Spacing: " + wordSpacing)
        strongElements.forEach(element =>{
            element.style.wordSpacing = wordSpacing + "px"
            
        })
    }

    return (
        <div>
            <div>Chord Spacing</div>
            <button onClick={() =>{changeWordSpacing(1)}}>{`+1`}</button>
            <button onClick={() =>{changeWordSpacing(-1)}}>{`-1`}</button>
        </div>
        
    )
}

export default ChordSpacing