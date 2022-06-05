module.exports.deleteMarquee = async (req, res) => {
  const Marquee = require("../../models/Marquee");

  Marquee.deleteMany({}).then(() => {
    res.redirect("/panel");
  });
};
