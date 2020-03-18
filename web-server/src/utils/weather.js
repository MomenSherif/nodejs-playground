const geoCode = require('./geocode');
const forecast = require('./forecast');

const getWeather = async address => {
  const { langitude, latitude, location } = await geoCode(address);
  const { summary, temperature, precipProbability } = await forecast(
    latitude,
    langitude
  );
  return {
    location,
    summary,
    temperature,
    precipProbability
  };
};
module.exports = getWeather;
