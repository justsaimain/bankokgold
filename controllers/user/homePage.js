module.exports.homePage = async (req, res) => {
  const Data = require("../../models/Data");
  const Marquee = require("../../models/Marquee");

  const marquee = await Marquee.find();
  Data.findOne({}, {}, { sort: { createdAt: -1 } }, (err, result) => {
    res.render("user/index", {
      data: result,
      marquee: marquee[0]?.marquee_text,
    });
  });
};
