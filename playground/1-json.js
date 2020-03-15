const fs = require('fs');

// const note = {
//   title: 'Things to buy',
//   boyd: 'Milk & Food'
// };

// const noteJSON = JSON.stringify(note);

// fs.writeFileSync('1-json.json', noteJSON);

const dataBuffer = fs.readFileSync('./1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.title = 'Title updated';

console.log(data);

fs.writeFileSync('./1-json.json', JSON.stringify(data));
