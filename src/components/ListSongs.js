import styles from '@/styles/ListSongs.module.css'

//songList is actually an array
const ListSongs = ({songList, selectSong}) =>{
    
    const printSongList = (songList) =>{
        //console.log(songList)

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
                  {newList.reduce((acc, song) => {
                    if (song.length > 1) {
                      acc.buttons.push(
                        <button key={song} onClick={() => selectSong(song)}>
                          <u>{song.split(' - ')[0]}</u> <br/> <b>{song.split(' - ')[1]}</b>
                        </button>
                      );
                    } else {
                      if (acc.buttons.length > 0) {
                        acc.groups.push(<div key={song} className={styles.buttonGroup}>{acc.buttons}</div>);
                        acc.buttons = [];
                      }
                      acc.groups.push(<div key={`${song}-group`} className={styles.divider}>{song} {song} {song}</div>);
                    }
                    return acc;
                  }, { buttons: [], groups: [] }).groups}
                </div>
              );
        }
    }
    
    return (
        <div className={`${styles.main}`}>
            <h1>SONG LIST</h1>
            
            <div>
                {printSongList(songList)}
            </div>
            
        </div>
    )
}

export default ListSongs