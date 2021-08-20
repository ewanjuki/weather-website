const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send('<h1>Weather</h1>');
});

app.get("/help", (req, res) => {
  res.send("Help page");
});

app.get("/about", (req, res) => {
  res.send('<h1>About</h1>');
});

app.get("/weather", (req, res) => {
  res.send({location: 'Nairobi', forecast: '25degrees'});
});

app.listen(3000, () => console.log("Server running"));
