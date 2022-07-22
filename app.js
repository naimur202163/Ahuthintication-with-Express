const express = require("express");

const app = express();
require("dotenv").config();

// Middleware

app.use(express.json());


app.use(
  express.urlencoded({
    extended: true,
  })
);




// Starting server

app.listen(process.env.PORT,()=>{
    console.log(`The server is running on ${process.env.PORT}`)
})
