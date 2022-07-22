const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
require("dotenv").config();

// Middleware

app.use(express.json());

// Connection to the data base

try {
  mongoose.connect(`mongodb://localhost:27017/userdb`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("The mongosse ar connected");
} catch (error) {
  console.log(error);
}

// Server error handler
process.on('unhandledRejection',error=>{
    console.log('unhandledRejection',error)
})


app.use(
  express.urlencoded({
    extended: true,
  })
);

// Starting server

app.listen(process.env.PORT, () => {
  console.log(`The server is running on ${process.env.PORT}`);
});
