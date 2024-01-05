import styles from '@/styles/ClearSong.module.css'

const ClearSong = ({ clearSong, isSongSelected }) => {
    return (
        <div>
            {isSongSelected && (
                <button className={styles.clearSongButton} onClick={clearSong}>
                    SELECT NEW SONG
                </button>
            )}
        </div>
    )
}

export default ClearSong