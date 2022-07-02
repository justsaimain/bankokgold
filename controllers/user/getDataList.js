const Data = require("../../models/Data");
const Temp = require("../../models/Temp");

module.exports.getDataList = async (req, res) => {
  try {
    Data.find({}, {}, { sort: { createdAt: -1 } }, async (err, result) => {
      if (err) {
        console.log(err);
      }

      const data = result;

      const tempData = await Temp.findOne();
      if (tempData) {
        data.unshift(tempData);
      }

      res.render("user/dataList", {
        data: data,
      });
    });
  } catch (err) {
    console.error(err);
  }
};
