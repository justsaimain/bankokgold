const Data = require("../../models/Data");

module.exports.resultData = async (req, res) => {
  try {
    Data.find({}, {}, { sort: { createdAt: -1 } }, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.json({
        data: result,
      });
    });
  } catch (err) {
    console.error(err);
  }
};
