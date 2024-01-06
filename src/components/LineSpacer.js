const LineSpacer = () => {
    
    //grab all the <p> elements and then change their margin-block property
    const changeLineSpacing = value =>{
        //console.log("changing line spacing: " + value)
        const pElements = document.querySelectorAll('p')
        let computedStyle = window.getComputedStyle(pElements[0])
        let marginSize = computedStyle.marginBlock.split('p') //margin size returned e.g. ##px and we just want the number
        marginSize = parseInt(marginSize) + value
        pElements.forEach(element =>{
            element.style.marginBlock = marginSize + "px"
        })
    }

    return (
        <div>
            <div>Line Spacing</div>
            <button onClick={() => { changeLineSpacing(1) }}>{`+`}</button>
            <button onClick={() => { changeLineSpacing(-1) }}>{`-`}</button>
        </div>
    )
}

export default LineSpacer