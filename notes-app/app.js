const chalk = require('chalk');
const yargs = require('yargs');
const { getNotes, addNote, removeNote } = require('./notes');

const error = chalk.red;
const success = chalk.green;

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a note',
  // command options --option="...."
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body Content',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title, body }) {
    const isNoteAdded = addNote(title, body);
    isNoteAdded
      ? console.log(success('Note Added Successfully'))
      : console.log(error('Note Title Taken!'));
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title }) {
    const isRemoved = removeNote(title);
    isRemoved
      ? console.log(success('Note Removed Successfully'))
      : console.log(error('No Note Found!'));
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler() {
    console.log(chalk.green('Reading a note...'));
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'Listing your notes',
  handler() {
    const notes = getNotes();
    console.log(chalk.yellow('Your notes:'));
    notes.forEach(({ title }) => console.log(chalk.blue(title)));
  }
});

// parsing arguments
yargs.parse();
