const path = require('path');

const express = require('express');

const app = express();
const port = 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send({
    location: 'Cairo',
    forecast: 18
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
