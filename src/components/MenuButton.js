import { useState } from 'react'
import styles from '@/styles/MenuButton.module.css'

const MenuButton = ({toggleMenu}) =>{
    
    
    return (
        <div className={`${styles.container}`}>
            <button id={`${styles.menuButton}`} onClick={toggleMenu}>OPTIONS</button>
        </div>
    )
}

export default MenuButton