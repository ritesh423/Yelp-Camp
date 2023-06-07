const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const env = require("dotenv").config();
const axios = require("axios");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

console.log("Checking");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${cities[random].city}, ${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum ...",
      image:
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_1280.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectet lorem, sed diam nonumy lorem, sed diam nonumy",
      price: price,
    });
    await camp.save();
    console.log("Campground saved");
  }
};

console.log("Checking Code");

seedDB().then(() => {
  mongoose.connection.close();
});
