import React from "react"
import styles from '@/styles/PageDown.module.css'

const PageDown = () => {
    const handlePageDown = () => {
        //scroll the window down by the height of the viewport
        window.scrollBy(0, (window.innerHeight * 0.8))
        console.log("scrolling down, hopefully")
    }

    return (
        <div className={`${styles.pageDown}`}>
            <button onClick={() => { handlePageDown() }}>PageDn</button>
        </div>
    )
}

export default PageDown