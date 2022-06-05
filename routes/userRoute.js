const { Router } = require("express");
const express = require("express");

const { getDataList } = require("../controllers/user/getDataList");
const { homePage } = require("../controllers/user/homePage");
const { getServerStats } = require("../controllers/user/getServerStats");

const router = Router();

router.use(express.static("public"));

router.get("/", homePage);
router.get("/results", getDataList);
router.get("/stats", getServerStats);

module.exports = router;
