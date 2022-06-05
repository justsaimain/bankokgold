const { Router } = require("express");
const express = require("express");

const { liveData } = require("../controllers/user/liveData");
const { resultData } = require("../controllers/user/resultData");

const router = Router();
router.use(express.static("public"));

router.get("/live", liveData);
router.get("/results", resultData);

module.exports = router;
