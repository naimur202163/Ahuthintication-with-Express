const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes=require('./routes/userRoutes');
const app = express();
require("dotenv").config();

// Middleware

app.use(express.json());

// Connection to the data base

try {
  mongoose.connect(`mongodb://localhost:27017/Authintication`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("The mongosse ar connected");
} catch (error) {
  console.log(error);
}

// Routes immpot

app.use('/api/v1',userRoutes)



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
