const fetch = require('node-fetch');

module.exports = (latitude, langitude) => {
  const weatherURL = `https://api.darksky.net/forecast/86e61a35dbdacf7a30c5092a5569b9f0/${latitude},${langitude}?units=si`;
  return fetch(weatherURL)
    .then(res => res.json())
    .then(
      ({ daily: { data }, currently: { temperature, precipProbability } }) => {
        return {
          summary: data[0].summary,
          temperature,
          precipProbability
        };
      }
    );
};
