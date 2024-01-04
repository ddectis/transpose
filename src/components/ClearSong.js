import styles from '@/styles/ClearSong.module.css'

const ClearSong = ({ clearSong, isSongSelected }) => {
    return (
        <div>
            {isSongSelected && (
                <button className={styles.clearSongButton} onClick={clearSong}>
                    Select New Song
                </button>
            )}
        </div>
    )
}

export default ClearSong