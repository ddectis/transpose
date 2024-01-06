import styles from '@/styles/ListSongs.module.css'

const ListControls = () =>{
    
    const expandAll = () =>{
        console.log("Expand All")
        const buttonGroups = document.querySelectorAll('#buttonGroup')
        buttonGroups.forEach(button =>{
            if (button.classList.contains(styles.hide)){
                button.classList.remove(styles.hide)
            }
        })
    }

    const contractAll = () =>{
        console.log("Contract All")
        const buttonGroups = document.querySelectorAll('#buttonGroup')
        buttonGroups.forEach(button =>{
            if (!button.classList.contains(styles.hide)){
                button.classList.add(styles.hide)
            }
        })
    }


    return (
        <div>
            <p>List Controls</p>
            <button onClick={() =>{expandAll()}}>Expand All</button>
            <button onClick={() =>{contractAll()}}>Contract All</button>
        </div>
    )
}

export default ListControls