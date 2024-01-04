const fs = require('fs');
const path = require('path');

const songDirectory = './public/songs';

const fileNamesWithExtensions = fs.readdirSync(songDirectory);
const songNamesWithoutExtensions = fileNamesWithExtensions.map(fileName => {
  const songName = path.parse(fileName).name;
  return songName;
});

fs.writeFile('./public/songs.json', JSON.stringify(songNamesWithoutExtensions), err => {
  if (err) {
    console.error('Error generating file names:', err);
  } else {
    console.log('File names generated successfully!');
  }
});
