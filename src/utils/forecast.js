const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f31b0ddef5e83fd3b7f9b975b84dea07&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      const { weather_descriptions, temperature, feelslike, humidity } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}.It is currently ${temperature} degrees. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
