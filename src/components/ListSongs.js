import styles from '@/styles/ListSongs.module.css'

//songList is actually an array
const ListSongs = ({songList, selectSong}) =>{
    
    const printSongList = (songList) =>{
        console.log(songList)

        const newList = []
        let previousLetter = ''

        //process the songArray and insert capital letter breakers at each new letter to separate e.g. the "A" songs from the "B" songs etc
        for (const song of songList){
            const firstLetter = song[0].toUpperCase()

            if (firstLetter !== previousLetter){
                newList.push(firstLetter)
                previousLetter = firstLetter
            }

            newList.push(song)
        }

        if (newList){
            //console.log(songList)
            return (
                <div className={`${styles.songList}`}>
                    {newList.map(song =>{
                        if(song.length > 1){
                            return <button key={song} onClick={() => {selectSong(song)}}>{song}</button>
                        } else {
                            return <h2 key={song} className={styles.divider}>{song}</h2>
                        }
                        
                    })}
                </div>
            )
        }
    }
    
    return (
        <div className={`${styles.main}`}>
            <h1>SONG LIST COMPONENT</h1>
            
            <div>
                {printSongList(songList)}
            </div>
            
        </div>
    )
}

export default ListSongs