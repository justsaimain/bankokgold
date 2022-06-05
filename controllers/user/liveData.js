const moment = require("moment");

module.exports.liveData = async (req, res) => {
  const Option = require("../../models/Option");
  const currentDateTime = moment(new Date()).format("MMMM D YYYY, H:mm:ss");
  const seedrandom = require("seedrandom");
  const interval = 60 * 123459; // 30 is for every 30 second data change

  const rng = seedrandom(
    Math.floor(((new Date().getTime() * new Date().getDate()) / interval) * 60)
  );
  const rng2 = seedrandom(
    Math.floor(((new Date().getTime() * new Date().getDate()) / interval) * 60)
  );

  const num_one = rng().toString().split(".")[1].substring(0, 3);
  const num_two = rng2().toString().split(".")[1].slice(-3);

  let rData = {};
  Option.find()
    .then((result) => {
      if (result.length > 0) {
        const data = result[0];
        if (
          new Date(currentDateTime) >= new Date(data.showDateTime) &&
          new Date(currentDateTime) < new Date(data.deleteDateTime)
        ) {
          console.log(
            "condition 1",
            new Date(currentDateTime) >= new Date(data.showDateTime)
          );
          console.log(
            "condition 2",
            new Date(currentDateTime) < new Date(data.deleteDateTime)
          );
          console.log("current time", currentDateTime);
          console.log("show time", data.showDateTime);
          console.log("delete time", data.deleteDateTime);
          rData = {
            num_one: "1." + data.buy,
            num_two: "2." + data.sell,
            two_d: data.buy.slice(-1) + data.sell.slice(-1),
            three_d: data.buy,
          };
        } else if (new Date(currentDateTime) > new Date(data.deleteDateTime)) {
          Option.deleteOne({ _id: data._id })
            .then(() => {
              rData = {
                num_one: "1." + num_one,
                num_two: "2." + num_two,
                two_d: num_one.slice(-1) + num_two.slice(-1),
                three_d: num_one,
              };
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          rData = {
            num_one: "1." + num_one,
            num_two: "2." + num_two,
            two_d: num_one.slice(-1) + num_two.slice(-1),
            three_d: num_one,
          };
        }
      } else {
        rData = {
          num_one: "1." + num_one,
          num_two: "2." + num_two,
          two_d: num_one.slice(-1) + num_two.slice(-1),
          three_d: num_one,
        };
      }
      res.json(rData);
    })
    .catch((err) => {
      console.log(err);
    });
};
