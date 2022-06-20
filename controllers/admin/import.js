const reader = require("xlsx");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Data = require("../../models/Data");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "import/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("xlsx");

module.exports.getImport = (req, res) => {
  res.render("admin/import");
};

module.exports.postImport = (req, res) => {
  let data = {};
  upload(req, res, function () {
    data = {
      img: req.file.filename,
    };
    const filePath = path.join(
      __dirname,
      "../../",
      "import/" + req.file.filename
    );
    const file = reader.readFile(filePath);

    const sheetData = [];
    const insertData = [];

    const tempData = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[0]],
      {
        range: 1,
      }
    );

    tempData.forEach((res) => {
      sheetData.push(res);
    });

    sheetData.forEach((data) => {
      let insD = {};
      let times = Object.keys(data);
      let values = Object.values(data);
      values.shift();
      times.shift();
      times.forEach((time, index) => {
        insD = {
          date: String(Object.values(data)[0]).replaceAll(".", "/"),
          buy:
            "1." +
            Math.floor(Math.random() * 90 + 10) +
            String(values[index])[0],
          sell:
            "1." +
            Math.floor(Math.random() * 90 + 10) +
            String(values[index])[1],
          time: time,
          two_d: values[index].split(" - ")[0],
          three_d: values[index].split(" - ")[1],
        };
        insertData.push(insD);
      });
    });

    if (fs.existsSync(`./import/${req.file.filename}`)) {
      fs.unlinkSync(`./import/${req.file.filename}`);
    } else {
      console.log("no file in " + `./import/${req.file.filename}`);
    }

    Data.insertMany(insertData, (err, docs) => {
      if (err) {
        res.render("admin/import", { error: err });
      }

      res.render("admin/import", { success: "success" });
    });
  });
};
