    const Data = require("../../models/Data");
    const mongoose = require("mongoose");

    module.exports.getHistory = (req, res) => {
      try {
        Data.find()
          .then((result) => {
            console.log(result);
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

    module.exports.getHistoryEdit = (req, res) => {
      const id = mongoose.Types.ObjectId(req.params.id);
      try {
        Data.findOne({ _id: id })
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

    module.exports.postHistoryEdit = (req, res) => {
      const id = mongoose.Types.ObjectId(req.params.id);
      const { buy, sell, two_d, three_d } = req.body;

      try {
        Data.findOneAndUpdate({ _id: id }, { buy, sell, two_d, three_d })
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
