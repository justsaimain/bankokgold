module.exports.updateMarquee = async (req, res) => {
  const Marquee = require("../../models/Marquee");
  const { marquee_text } = req.body;

  var query = {},
    update = { marquee_text },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Marquee.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;

    res.redirect("/panel");
    // do something with the document
  });
};
