const Data = require("../../models/Data");

module.exports.getDataList = async (req, res) => {
  try {
    Data.find({}, {}, { sort: { createdAt: -1 } }, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.render("user/dataList", {
        data: result,
      });
    });
  } catch (err) {
    console.error(err);
  }
};
