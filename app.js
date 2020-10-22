
const yargs = require('yargs');
const chalk = require('chalk');
const notes=require('./notes')
//yargs version
yargs.version('1.1.0');

//yargs add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type:'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type:'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removing a note',
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type:'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: 'read',
  describe: 'Reading a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type:'string'
    }
  },
  handler(argv) {
    notes.readNotes(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Showing all list',
  handler() {
    notes.listNotes();
  }
})

yargs.parse()
//console.log(yargs.argv)

