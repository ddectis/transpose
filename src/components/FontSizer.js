import { Parisienne } from "next/font/google"
import { permanentRedirect } from "next/navigation"

const FontSizer = () => {

    //grab all the <p> elements and then change their size by the value taken in the function
    const changeFontSize = value => {
        //console.log("change font size: " + value)
        const pElements = document.querySelectorAll('p')
        //console.log(pElements)
        let computedStyle = window.getComputedStyle(pElements[0])
        let fontSize = computedStyle.fontSize.split('p') //font size returned e.g. ##px so we split at p to get just a number
        fontSize = parseInt(fontSize) + value
        //console.log("Size: " + fontSize)
        pElements.forEach(element => {
            element.style.fontSize = fontSize + "px"
        })
    }

    return (
        <div>
            <div>Font Size</div>
            <button onClick={() => { changeFontSize(1) }}>{`+`}</button>
            <button onClick={() => { changeFontSize(-1) }}>{`-`}</button>
        </div>
    )
}

export default FontSizer