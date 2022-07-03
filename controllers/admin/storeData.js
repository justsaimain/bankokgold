const Data = require("../../models/Data");
const fs = require("fs");

module.exports.storeData = async (req, res) => {
  console.log("STORING RUNNING");

  const axios = require("axios");
  const dotenv = require("dotenv");
  dotenv.config();

  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const data = await axios.get(process.env.BASE_URL + "/api/live");

    const sData = new Data({
      buy: data.data.num_one,
      sell: data.data.num_two,
      three_d: data.data.three_d,
      two_d: data.data.two_d,
      date: dd + "/" + mm + "/" + yyyy,
      time: today.toLocaleTimeString([], { timeStyle: "short" }),
    });

    var elogger = fs.createWriteStream(process.cwd() + "/logs/error.txt", {
      flags: "a", // 'a' means appending (old data will be preserved)
    });

    // var slogger = fs.createWriteStream(process.cwd() + "/logs/success.txt", {
    //   flags: "a", // 'a' means appending (old data will be preserved)
    // });

    var eWriteLine = (line) => elogger.write(`\n${line}`);
    // var sWriteLine = (line) => slogger.write(`\n${line}`);

    sData
      .save()
      .then((result) => {
        console.log("saved", result);
        // sWriteLine("Store new data : id - " + result._id);
      })
      .catch((error) => {
        console.log(error);
        eWriteLine(error);
      });
  } catch (err) {
    console.error(err);
  }
};
