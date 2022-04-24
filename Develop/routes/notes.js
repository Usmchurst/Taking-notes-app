const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./fsutils');

// notes.post("/api/notes", (req, res) => {
// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    console.info(`${req.method} request for information`);
    readFromFile('./db.json').then((data) => res.json(JSON.parse(data)));
  });
    
   // GET Route for a specific tip
notes.get('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.notes_id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No notes with that ID');
      });
  });

  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newnotes = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newnotes, './db.json');
      res.json(`Notes added successfully 🚀`);
    } else {
      res.error('Error in adding notes');
    }
  }); 
  
//   app.delete('/api/notes/:id', (req, res) => {
//     // reading notes form db.json
//     let db = JSON.parse(fs.readFileSync('db/db.json'))
//     // removing note with id
//     let deleteNotes = db.filter(item => item.id !== req.params.id);
//     // Rewriting note to db.json
//     fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
//     res.json(deleteNotes);

//   })

  module.exports = notes;