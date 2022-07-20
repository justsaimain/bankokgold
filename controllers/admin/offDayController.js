const OffDay = require("../../models/OffDay");
const mongoose = require("mongoose");

module.exports.getOffDay = (req, res) => {
  try {
    OffDay.find()
      .then((result) => {
        console.log(result);
        res.render("admin/offday", {
          data: result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
  }
};

module.exports.saveOffDay = (req, res) => {
  try {
    const { date, time } = req.body;
    const sData = new OffDay({
      date: date,
      time: time,
    });

    sData
      .save()
      .then((result) => {
        console.log("saved", result);
        res.redirect("/panel/offday");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
  }
};
