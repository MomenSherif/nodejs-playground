const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by Node.js!');

/**
 * Challenge: Append a message to notes.txt
 */

fs.appendFileSync('notes.txt', ` Mo'men Sherif was here...`);
