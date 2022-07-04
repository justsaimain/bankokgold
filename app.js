const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const { storeData } = require("./controllers/admin/storeData");
const cron = require("node-cron");

// 8 AM
cron.schedule("0 8 * * *", () => {
  storeData();
});

// 10 AM
cron.schedule("0 10 * * *", () => {
  storeData();
});

// 12 PM
cron.schedule("0 12 * * *", () => {
  storeData();
});

// 2 PM
cron.schedule("0 14 * * *", () => {
  storeData();
});

// 4 PM
cron.schedule("0 16 * * *", () => {
  storeData();
});

// 7 PM
cron.schedule("0 19 * * *", () => {
  storeData();
});

// 10 PM
cron.schedule("0 22 * * *", () => {
  storeData();
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
