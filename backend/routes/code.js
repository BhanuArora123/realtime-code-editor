const express = require("express");
const { saveCode, getCode, runCode } = require("../controllers/code");
const router = express.Router();

router.post("/saveCode",saveCode);
router.post("/getCode",getCode);
router.post("/runCode",runCode);

module.exports = router;