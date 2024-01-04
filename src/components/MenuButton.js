import styles from '@/styles/MenuButton.module.css'

const MenuButton = ({isMenuOpen, toggleMenu}) =>{
    
    return (
        <div className={`${styles.container}`}>
            <button id={`${styles.menuButton}`} onClick={toggleMenu}>
                {isMenuOpen ? 'VIEW OPTIONS' : 'CLOSE OPTIONS'}
            </button>
        </div>
    )
}

export default MenuButton