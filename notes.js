const fs = require('fs');
const chalk = require('chalk');

const getNotes =  ()=> {
  return "Your notes..."
}
 
const addNote = (title, body) =>{
  const notes = loadNote();

  const duplicateNote = notes.find((note)=>note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
  
    saveNote(notes);
    console.log("Note added");
  } else {
    console.log("Note already exists");
  }
}

const loadNote =  ()=> {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
  
};

const saveNote = (note)=> {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync('notes.json',dataJSON);
};

const removeNote =  (title) =>{
  const notes = loadNote();

  const noteToKeep = notes.filter((note)=> note.title !== title);
  saveNote(noteToKeep);

  if (notes.length === noteToKeep.length) {
    console.log(chalk.red('No Notes found with that title'));
  } else {
    console.log(chalk.green('Note deleted successfully'));
  }
}

const listNotes = () => {
  const notes = loadNote();

  notes.forEach((note) => {
    console.log(chalk.blue.inverse(note.title));
  });
};

const readNotes = (title) => {
  const notes = loadNote();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue(note.title)+" : "+chalk.green(note.body));
  } else {
    console.log(chalk.red("No notes found"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes:readNotes,
};