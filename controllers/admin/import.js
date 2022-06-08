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

    let tempData = [];
    let insertData = [];
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {
      range: 2,
    });
    temp.forEach((res) => {
      tempData.push(res);
    });

    tempData.forEach((data) => {
      console.log("dd", data);
      let insD = {};
      let times = Object.keys(data);
      let values = Object.values(data);
      insD = {
        date: data.Date,
        time: times[1],
      };
      insertData.push(insD);
    });

    console.log("in", insertData);
    if (fs.existsSync(`./import/${req.file.filename}`)) {
      fs.unlinkSync(`./import/${req.file.filename}`);
    } else {
      console.log("no file in " + `./import/${req.file.filename}`);
    }

    res.send(tempData);
  });
};
