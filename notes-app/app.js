const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

const error = chalk.red;

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: function() {
    console.log(chalk.green('Adding note...'));
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function() {
    console.log(chalk.keyword('orange')('Removing note...'));
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function() {
    console.log(chalk.green('Reading a note...'));
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'Listing your notes',
  handler: function() {
    console.log(chalk.keyword('orange')('Listing notes...'));
  }
});

console.log(yargs.argv);
