const express = require("express");
const { signup, Signin, google } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", Signin);
router.post("/google", google);

module.exports = router;
