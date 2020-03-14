// const sum = require('./utils');
// console.log(sum(3, 6));

/**
 * Challenge: Define and use a function in a new file
 *  1. Create new file called notes.js
 *  2. Create getNotes function that returns "Your notes..."
 *  3. Export getNotes function
 *  4. From app.js, load in and call the function printing message to console
 */

const getNotes = require('./notes');
console.log(getNotes());
