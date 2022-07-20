const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const { storeData } = require("./controllers/admin/storeData");
const cron = require("node-cron");

// 8 AM
var round_one = cron.schedule("0 8 * * *", () => {
  storeData();
});

// 10 AM
var round_two = cron.schedule("0 10 * * *", () => {
  storeData();
});

// 12 PM
var round_three = cron.schedule("0 12 * * *", () => {
  storeData();
});

// 2 PM
var round_four = cron.schedule("0 14 * * *", () => {
  storeData();
});

// 4 PM
var round_five = cron.schedule("0 16 * * *", () => {
  storeData();
});

// 7 PM
var round_six = cron.schedule("0 19 * * *", () => {
  storeData();
});

// 10 PM
var round_seven = cron.schedule("0 22 * * *", () => {
  storeData();
});

// midnight
cron.schedule("0 0 0 * * *", () => {
  round_one.start();
  round_two.start();
  round_three.start();
  round_four.start();
  round_five.start();
  round_six.start();
  round_seven.start();
});

const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute");
const apiRoutes = require("./routes/apiRoute");

const dbURI = process.env.DB_URI;

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("App is running at Port " + port);
    app.listen(port);
  })
  .catch((err) => console.log(err));

app.use("/panel", adminRoutes);
app.use("/api", apiRoutes);
app.use("/", userRoutes);

app.use((req, res) => {
  res.redirect("/");
});
