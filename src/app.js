const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) =>
  res.render("index", { title: "Weather", name: "Edwin" })
);

app.get("/about", (req, res) =>
  res.render("about", { title: "About", name: "Edwin" })
);

app.get("/help", (req, res) => res.render("help", { message: "Helpful message" }));

app.get("/weather", (req, res) => {
  res.send({ location: "Nairobi", forecast: "25degrees" });
});

app.listen(3000, () => console.log("Server running"));
