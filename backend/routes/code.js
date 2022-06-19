const express = require("express");
const { saveCode, getCode } = require("../controllers/code");
const router = express.Router();

router.post("/saveCode",saveCode);
router.post("/getCode",getCode);

module.exports = router;