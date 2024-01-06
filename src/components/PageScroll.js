import React from "react"
import styles from '@/styles/PageScroll.module.css'

const PageScroll = () => {
    const handleScroll = value => {
        //scroll the window down by the height of the viewport
        window.scrollBy(0, (window.innerHeight * 0.8 * value))
        console.log("scrolling: " + value)
    }

    return (
        <div className={`${styles.pageUpDown}`}>
            <button className={`${styles.marginBottom}`} onClick={() => { handleScroll( -1) }}>PageUp</button>
            <button onClick={() => { handleScroll( 1) }}>PageDn</button>
        </div>
    )
}

export default PageScroll