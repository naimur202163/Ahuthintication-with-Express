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

  // Saving data on mongoose\
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

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    // When We got errors
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }

    // If user not find
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    // Comapring Password
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    // checking if password was valid and send response accordingly

    if (!passwordIsValid) {
      return res.status(404).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    //signing token with user id

    let token = jwt.sign(
      {
        id: user.id,
      },

      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },

      message: "Login successfully",
      accessToken: token,
    });
  });
};

exports.getAllUsers = (req, res) => {
  if (!User ) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user == "admin") {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      User,
      message: "Unauthorised access",
    });
  }
};

exports.hello = (req, res) => {
  res.json({
    success: true,
    message: "Hello World",
  });
};
