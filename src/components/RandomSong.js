import styles from '@/styles/RandomSong.module.css'

const RandomSong = ({ arrayOfSongTitles, selectSong }) => {
        
    const selectRandomSong = () => {
        console.log("selecting random song from an array of length " + arrayOfSongTitles.length)
        const rnd = Math.floor(Math.random() * Math.floor(arrayOfSongTitles.length))
        console.log("Selected Song: " + rnd)
        const selectedSong = arrayOfSongTitles[rnd]
        console.log("Selected Song: " + selectedSong)
        selectSong(selectedSong)
    }

    return (
        <div className={`${styles.buttonHolder}`}>
            <button onClick={() => { selectRandomSong() }}>Pick Random Song</button>
        </div>
    )
}

export default RandomSong