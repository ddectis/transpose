import React from "react"
import styles from '@/styles/PageScroll.module.css'
import Image from 'next/image'

const PageScroll = () => {
    const handleScroll = value => {
        //scroll the window down by the height of the viewport
        window.scrollTo({
            top: window.scrollY + window.innerHeight * 0.66 * value,
            behavior: 'smooth',
        })
        console.log("scrolling: " + value)
    }

    return (
        <div className={`${styles.pageUpDown}`}>
            <button
                className={`${styles.marginBottom}`}
                onClick={() => { handleScroll(-1) }}
            ><Image
                    src='/arrow.png'
                    width={50}
                    height={50}
                    alt='CMH Logo'
                    
                />
            </button>
            <button
                onClick={() => { handleScroll(1) }}
            >
                <Image
                    src='/arrow.png'
                    width={50}
                    height={50}
                    alt='CMH Logo'
                    className={`${styles.scrollDownImage}`}
                />
            </button>
        </div>
    )
}

export default PageScroll