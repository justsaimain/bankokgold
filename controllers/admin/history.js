const Data = require("../../models/Data");
const mongoose = require("mongoose");

module.exports.getHistory = async (req, res) => {
  try {
    await Data.find()
      .then((result) => {
        res.render("admin/history", {
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

module.exports.getHistoryEdit = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    await Data.findOne({ _id: id })
      .then((result) => {
        res.render("admin/edit", {
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

module.exports.postHistoryEdit = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const { buy, sell, two_d, three_d } = req.body;

  try {
    await Data.findOneAndUpdate({ _id: id }, { buy, sell, two_d, three_d })
      .then((result) => {
        console.log(result);
        res.redirect("/panel/history");
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/panel/history");
      });
  } catch (e) {
    console.log(e);
    res.redirect("/panel/history");
  }
};

module.exports.deleteHistory = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    await Data.deleteOne({ _id: id })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};
