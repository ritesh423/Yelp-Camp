const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground.js");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({ title });
  console.log(campgrounds.location);
  res.render("campgrounds/index", { campgrounds });
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "Bhartiye camp",
    description: "Bhartiyon ke liye camp",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
