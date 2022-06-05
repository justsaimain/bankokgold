const TwoD = require("../../models/TwoD");

module.exports.twoDList = async (req, res) => {
  try {
    TwoD.find()
      .then((result) => {
        console.log(result);
        res.render("admin/twoDList", {
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
