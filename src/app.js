const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) =>
  res.render("index", { title: "Weather", name: "Edwin" })
);

app.get("/about", (req, res) =>
  res.render("about", { title: "About", name: "Edwin" })
);

app.get("/help", (req, res) =>
  res.render("help", {
    message: "Helpful message",
    title: "Help",
    name: "Edwin",
  })
);

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({ location, forecastData, address });
    });
  });
});

app.get("/help/*", (req, res) =>
  res.render("404", {
    title: "404",
    error: "Help article not found.",
    name: "Edwin",
  })
);

app.get("*", (req, res) =>
  res.render("404", { title: "404", error: "Page not found.", name: "Edwin" })
);

app.listen(port, () => console.log("Server running"));
