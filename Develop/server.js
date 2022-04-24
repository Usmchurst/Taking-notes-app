// import express
const express = require('express');
//the following to bypass relative pathing
const path = require('path');

const notes = require('./routes/notes');

//connecting the files 
const dbData = require('./db.json');
// const uuid = require('./helpers/uuid');

const PORT = 3001;
// app.use('/api',index)
const app = express();
// middleware for parsing application.json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api/notes',notes)
// GET request for a review

// app.get('/api/notes',(req,res) => 
// res.json(dbData) )

// app.get('/api/notes', (req, res) => {
//     const readFile= fs.readFileSync('./db.json', 'utf8');
//     const notes = JSON.parse(readFile);
//     res.json(notes)}
// );

// app.get('/',(req,res) => res.sendFile(path.join(__dirname,'public/index.html')))

//Get request
app.get('/notes', (req, res) => 
 res.sendFile(path.join(__dirname, '/public/notes.html' ))
);

app.get('/', (req, res) => 
 res.sendFile(path.join(__dirname, '/public/index.html'))
 );

 app.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, '/public/index.html'))
 );

 

    
    


 app.listen(PORT, () => 
console.log(`Sample text listening at http://localhost:${PORT}`))

 


