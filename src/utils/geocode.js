const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWR1bmp1a2kiLCJhIjoiY2tzM3RleTRtMGR4NTJ4bGxqMDVjeHczbSJ9.mgMAixR-nC5w7x5rFzgzug&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      const { place_name, center } = body.features[0];
      callback(undefined, {
        location: place_name,
        latitude: center[1],
        longitude: center[0],
      });
    }
  });
};

module.exports = geocode;
