const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello Express.js</h1>');
});

app.get('/help', (req, res) => {
  res.send('<h3>Help Page</h3>');
});

app.get('/about', (req, res) => {
  res.send({
    name: `Mo'men`,
    age: 23
  });
});

app.get('/weather', (req, res) => {
  res.send({
    location: 'Cairo',
    forecast: 18
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
