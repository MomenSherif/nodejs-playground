const chalk = require('chalk');
const getNotes = require('./notes');

const error = chalk.red;

const command = process.argv[2];

switch (command) {
  case 'add':
    console.log(chalk.green('Adding note...'));
    break;
  case 'remove':
    console.log(chalk.keyword('orange')('Removing note...'));
    break;
  default:
    console.log(error('Invalid Command'));
    break;
}

console.log(process.argv);
