const moment = require("moment");

module.exports.updateData = async (req, res) => {
  const Option = require("../../models/Option");

  const { sell, buy } = req.body;

  const currentDateTime = moment(new Date()).format("MMMM D YYYY, H:mm:ss");

  const showTime = [
    moment()
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 10, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 14, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 19, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
    moment()
      .set({ hour: 22, minute: 0, second: 0, millisecond: 0 })
      .format("MMMM D YYYY, H:mm:ss"),
  ];

  let showDateTime;

  if (new Date(currentDateTime) >= new Date(showTime[6])) {
    showDateTime = moment()
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
      .add(1, "days")
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
  } else if (new Date(currentDateTime) >= new Date(showTime[5])) {
    showDateTime = moment()
      .set({ hour: 22, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 10PM before 1 minutes : 9:59 PM");
  } else if (new Date(currentDateTime) >= new Date(showTime[4])) {
    showDateTime = moment()
      .set({ hour: 19, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 7PM before 1 minutes : 6:59 PM");
  } else if (new Date(currentDateTime) >= new Date(showTime[3])) {
    showDateTime = moment()
      .set({ hour: 16, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 4PM before 1 minutes : 3:59 PM");
  } else if (new Date(currentDateTime) >= new Date(showTime[2])) {
    showDateTime = moment()
      .set({ hour: 14, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 2PM before 1 minutes : 1:59 PM");
  } else if (new Date(currentDateTime) >= new Date(showTime[1])) {
    showDateTime = moment()
      .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 12PM before 1 minutes : 11:59 PM");
  } else if (new Date(currentDateTime) >= new Date(showTime[0])) {
    showDateTime = moment()
      .set({ hour: 10, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 10PM before 1 minutes : 9:59 PM");
  } else {
    showDateTime = moment()
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
      .subtract(1, "minutes")
      .format("MMMM D YYYY, H:mm:ss");
    console.log("🚨 load static data for 8PM before 1 minutes : 7:59 PM");
  }

  const deleteDateTime = moment(new Date(showDateTime))
    .add(3, "minutes")
    .format("MMMM D YYYY, H:mm:ss");

  var query = {},
    update = { sell, buy, showDateTime, deleteDateTime },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Option.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;

    res.redirect("/panel");
    // do something with the document
  });
};
