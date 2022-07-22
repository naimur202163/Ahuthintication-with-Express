const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require("../model/userModel");

exports.signup = (req, res, next) => {
  // Geting data form Body
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // Saving data on mongoose

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    } else {
      res.status(200).send({
        message: "User Registerd Successfully",
      });
    }
  });
};
