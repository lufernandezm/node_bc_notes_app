const chalk = require('chalk')
const Randoma = require('randoma');
const random = new Randoma({seed: 20});
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find(note => note.title === title)

    if(!duplicateNotes){
        notes.push({title,body})
        saveNotes(notes)
        msg = chalk.bgGreen('Note added!')
        console.log(msg)
    } else {
        msg = chalk.bgRed('Note title is already taken!')
        console.log(msg)
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter(note => note.title !== title)

    if(filteredNotes.length === notes.length){
        msg = chalk.bgRed('Note not found!')
        console.log(msg)
    } else {
        saveNotes(filteredNotes)
        msg = chalk.bgGreen('Note removed!')
        console.log(msg)
    }
}

const listNotes = () =>{

    const notes = loadNotes()
    const msg = chalk.bold.blueBright('Your notes')

    console.log(msg)

    notes.forEach(note => {
        var print = chalk.hex(random.color(0.3).hex().toString())
        title = print(note.title)
        console.log(title)
    });
}

const readNote = (title) => {

    const notes = loadNotes()
    const note = notes.find(note => note.title === title) 
    
    if(note){
        const noteTitle = chalk.bold.blue.bgGray(note.title)
        console.log(noteTitle)
        console.log(note.body)
    } else {
        msg = chalk.bgRed('Note not found!')
        console.log(msg)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}


module.exports = {
    addNote, 
    removeNote,
    listNotes,
    readNote
}