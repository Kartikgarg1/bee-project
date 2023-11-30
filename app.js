const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const dotenv = require('dotenv');

// app.get("/", (req, res) => {
//   res.send(`Hello g23 i am node and express`);
// });

// app.get("/employees", (req, res) => {
//   res.send(`Hello i am employees`);
// });

const connectDB = require('./config/db');
dotenv.config({path: './config/config.env'});
connectDB();

app.use('/', require('./routes/index'));

app.listen(3000, () => {
  console.log(`Server started on 3000`);
});
