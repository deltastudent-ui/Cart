
const mongoose = require("mongoose");
const initdata = require("./data.js");
const cardSchema = require("../model/cardSchema.js");
const Card = require("../model/cardSchema.js");
const cardData = require("./data.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/Ecomerce";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Card.deleteMany({});
 await Card.insertMany(initdata.data);
 console.log("data was initialize");
};

initDB();
