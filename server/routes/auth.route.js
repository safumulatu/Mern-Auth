const express = require("express");
const { signup, Signin } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", Signin);

module.exports = router;
