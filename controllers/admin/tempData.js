const Temp = require("../../models/Temp");

module.exports.getTemp = (req, res) => {
  Temp.find().then((docs) => {
    res.render("admin/temp", { data: docs[0] });
  });
};

module.exports.postTemp = (req, res) => {
  console.log(req.body);
  const { sell, buy, date, time } = req.body;

  var query = {},
    update = {
      sell: "2." + sell,
      buy: "1." + buy,
      date,
      time,
      two_d: buy.slice(-1) + sell.slice(-1),
      three_d: buy,
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Temp.findOneAndUpdate(query, update, options, function (error, result) {
    console.log(error);
    if (error) return;
    res.redirect("/panel/temp");
  });
};

module.exports.deleteTemp = (req, res) => {
  Temp.findOneAndDelete({}, {}, function (error, result) {
    console.log(error);
    if (error) return;
    res.redirect("/panel/temp");
  });
};
