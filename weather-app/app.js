const fetch = require('node-fetch');

const url =
  'https://api.darksky.net/forecast/86e61a35dbdacf7a30c5092a5569b9f0/37.8267,-122.4233';

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.currently));
