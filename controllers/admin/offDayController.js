const OffDay = require("../../models/OffDay");
const mongoose = require("mongoose");

module.exports.getOffDay = async (req, res) => {
  try {
    await OffDay.find()
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

module.exports.saveOffDay = async (req, res) => {
  try {
    const { date, time } = req.body;
    const sData = new OffDay({
      date: date,
      time: time,
    });

    await sData
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

module.exports.deleteOffDay = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  try {
    await OffDay.deleteOne({ _id: id })
      .then((result) => {
        res.redirect("/panel/offday");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
  }
};
