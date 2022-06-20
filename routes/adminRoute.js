const { Router } = require("express");
const express = require("express");
const router = Router();
const localStorage = require("localStorage");

const { deleteData } = require("../controllers/admin/deleteData");
const { storeData } = require("../controllers/admin/storeData");
const { updateData } = require("../controllers/admin/updateData");
const {
  getHistory,
  getHistoryEdit,
  postHistoryEdit,
} = require("../controllers/admin/history");
const { getImport, postImport } = require("../controllers/admin/import");

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Option = require("../models/Option");
const { updateMarquee } = require("../controllers/admin/updateMarquee");
const { deleteMarquee } = require("../controllers/admin/deleteMarquee");
const Marquee = require("../models/Marquee");
const jwtKey = process.env.TOKEN_SECRET;
const jwtExpirySeconds = 300; // second

router.use(express.static("public"));

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", (req, res) => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }

  const { username, password } = req.body;

  Admin.find({}, {}, {}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (username !== "" || password !== "") {
        const filtered = result.filter((admin) => admin.username === username);
        if (filtered.length > 0) {
          if (filtered[0].password === password) {
            const token = jwt.sign({ username }, jwtKey, {
              algorithm: "HS256",
              expiresIn: jwtExpirySeconds,
            });
            localStorage.setItem("token", token);
            res.redirect("/panel");
          } else {
            localStorage.removeItem("token");
            res.redirect("/panel/login");
          }
        } else {
          localStorage.removeItem("token");
          res.redirect("/panel/login");
        }
      } else {
        localStorage.removeItem("token");
        res.redirect("/panel/login");
      }
    }
  });
});

router.use((req, res, next) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return res.redirect("/panel/login");
  }

  jwt.verify(token, jwtKey, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
});

router.get("/", async (req, res) => {
  const marquee = await Marquee.find();

  Option.find({}, {}, {}, (err, result) => {
    res.render("admin/index", { data: result, marquee: marquee });
  });
});
router.post("/", updateData);
router.get("/his-rec", getHistory);
router.get("/his-rec/:id", getHistoryEdit);
router.post("/his-rec/:id", postHistoryEdit);

router.post("/marquee", updateMarquee);
router.post("/marquee/delete", deleteMarquee);
router.post("/delete", deleteData);
router.get("/store", storeData);

router.get("/import", getImport);
router.post("/import", postImport);
module.exports = router;
