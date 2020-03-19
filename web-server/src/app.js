const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getWeather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: `Mo'men Sherif`
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: `Mo'men Sherif`
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: `Mo'men Sherif`,
    message: 'Just close my application and you will be fine'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    // can not send multiple response so return from function
    return res.send({
      error: 'Must provide an address'
    });
  }

  getWeather(req.query.address)
    .then(data => {
      res.send({
        ...data,
        address: req.query.address
      });
    })
    .catch(err => {
      res.send({ error: 'Invalid Address' });
    });

  res.send({
    location: 'Cairo',
    forecast: 18
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: `Mo'men Sherif`,
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: `Mo'men Sherif`,
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
