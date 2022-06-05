module.exports.deleteData = async (req, res) => {
  const Option = require("../../models/Option");

  Option.deleteMany({}).then(() => {
    console.log("Delete Success");
    res.redirect("/panel");
  });
};
