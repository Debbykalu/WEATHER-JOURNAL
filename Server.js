// Require Express - Body Parser and Cors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Instance app for exrpess
const app = express();

//Middleware, configure bodyparser and cors, initialize web
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

// Setup Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

let projectData = {};

app.get("/appSend", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

app.post("/appAdd", (req, res) => {
  projectData = req.body;
});
