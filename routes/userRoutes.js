const { Router } = require("express");
const express = require("express");
const { signin, signup } = require("../controller/userController");

const router = express.Router();

router.route('/register').post(signup)
router.route('/login').post(signin);

module.exports = router;
