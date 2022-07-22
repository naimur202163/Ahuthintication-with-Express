const express = require("express");
const { signin, signup, getAllUsers } = require("../controller/userController");
const verifyToken = require("../middleware/authJWT");
const router = express.Router();

router.route("/register").post(signup);
router.route("/login").post(signin);
router.route("/hiddencontent").get(getAllUsers);

module.exports = router;
