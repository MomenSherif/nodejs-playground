const fetch = require('node-fetch');

module.exports = address => {
  const geoLocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9tZW5zaGVyaWYiLCJhIjoiY2s3dWUzeWFnMDJmdTNvbW8wZGdyOWJiayJ9.OKoCAhVntqPS7e_K4SJjhg&limit=1`;
  return fetch(geoLocationURL)
    .then(res => res.json())
    .then(({ features: [data] }) => {
      return {
        location: data.place_name,
        langitude: data.center[0],
        latitude: data.center[1]
      };
    });
};
