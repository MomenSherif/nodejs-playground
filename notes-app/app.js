// const sum = require('./utils');
// console.log(sum(3, 6));

/**
 * Challenge: Define and use a function in a new file
 *  1. Create new file called notes.js
 *  2. Create getNotes function that returns "Your notes..."
 *  3. Export getNotes function
 *  4. From app.js, load in and call the function printing message to console
 */

// const getNotes = require('./notes');
// console.log(getNotes());

// const validator = require('validator');
// console.log(validator.isEmail('momensherif.2019@gmail.com'));

/**
 * challenge: Use the chalk library in your project
 *  1. Install chalk
 *  2. Load chalk into app.js
 *  3. Use it to print the string "Success!" to the console in green
 *  Bonus: Use docs to mess around with other styles. Make text bold and inversed
 */

const chalk = require('chalk');

console.log(chalk.green('Success!'));
console.log(chalk.keyword('orange').bold('Success!'));
