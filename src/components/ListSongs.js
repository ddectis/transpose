import styles from '@/styles/ListSongs.module.css'
import ListControls from './ListControls'

//songList is actually an array
const ListSongs = ({ songList, selectSong }) => {

  const toggleExpand = id => {
    console.log("expand/contract " + id)
    const element = document.getElementById(`divider-${id}`)
    const childElement = element.nextElementSibling
    childElement.classList.toggle(styles.hide)
    console.log(element)
    console.log(childElement)
  }

  //the comma separated list of songs is processed and then wrapped in HTML
  const printSongList = (songList) => {
    //console.log(songList)

    const newList = []
    let previousLetter = ''

    //process the songArray and insert capital letter breakers at each new letter to separate e.g. the "A" songs from the "B" songs etc
    for (const song of songList) {
      const firstLetter = song[0].toUpperCase()

      if (firstLetter !== previousLetter) {
        newList.push(firstLetter)
        previousLetter = firstLetter
      }

      newList.push(song)
    }

    if (newList) {
      //console.log(songList)
      return (
        <div className={`${styles.songList}`}>
          {newList.reduce((acc, song) => {
            if (song.length > 1) { //dividers have a length of 1, so as long as we stay > 1 we'll accumulate buttons for each song that starts with the same letter
              acc.buttons.push(
                <button key={song} onClick={() => selectSong(song)}>
                  <u>{song.split(' - ')[0]}</u> <br /> <h2>{song.split(' - ')[1]}</h2>
                </button>
              );
            } else { //and then when a divider shows up we end up here
              if (acc.buttons.length > 0) {  //and we'll probably have a buttons group here
                acc.groups.push( //so we push a new buttonGroup div which contains the songs we just grouped from the last starting letter
                  <div
                    key={song}
                    className={`${styles.buttonGroup} ${styles.hide}`}
                    id='buttonGroup'
                  >
                    {acc.buttons}
                  </div>
                );
                acc.buttons = []; //the buttons accumulator is then cleared ahead of the next group
              }

              acc.groups.push( //recall that in this part of the conditional, we've had a length of 1 i.e. a divider, so we create a divider div
                <div
                  key={`${song}-group`}
                  className={`${styles.divider}`}
                  onClick={() => toggleExpand(song)}
                  id={`divider-${song}`}
                >
                  {song}
                </div>
              );
            }
            return acc;
          }, { buttons: [], groups: [] }).groups}
        </div>
      );
    }
  }

  return (
    <div className={`${styles.main}`}>
      <p>Click a letter below to view songs by artists starting with that letter. Elton is under E. Ben Folds is B etc</p>
      <ListControls />
      <div>
        {printSongList(songList)}
      </div>

    </div>
  )
}

export default ListSongs