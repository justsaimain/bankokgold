  const TwoD = require("../../models/TwoD");

  module.exports.scrapeData = async (req, res) => {
    const axios = require("axios");
    const cheerio = require("cheerio");

    const url =
      "https://classic.set.or.th/mkt/marketsummary.do?language=en&country=US";

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const set = $(
        "#maincontent > div > div:nth-child(3) > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)"
      ).text();

      const value = $(
        "#maincontent > div > div:nth-child(3) > div > div > table > tbody > tr:nth-child(1) > td:nth-child(8)"
      ).text();

      const twoD = new TwoD({
        set,
        value,
      });

      twoD
        .save()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };
