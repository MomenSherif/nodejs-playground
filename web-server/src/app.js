const path = require('path');

const express = require('express');

const app = express();
const port = 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    name: `Mo'men Sherif`
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: `Mo'men Sherif`.toUpperCase()
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'Just close my application and you will be fine'
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
