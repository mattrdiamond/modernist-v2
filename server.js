const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables from .env file into process.env (user environment)
if (process.env !== "production") require("dotenv").config();

// 1. Instantiate a new express application
const app = express();

// Use process environment's port or 5000
const port = process.env.PORT || 5000;

// Parse body of all incoming requests to JSON
app.use(bodyParser.json());

// Parse URL-encoded bodies - make sure url contains only valid characters.
app.use(bodyParser.urlencoded({ extended: true }));

// Cors middleware enables us to make requests from different origins (FEND/BEND)
app.use(cors());

// 2. Serve client application (in production, live node server will run on a Heroku url)
// Static middleware - serves static files from build folder
// path.join joins all path segments together separated by '/'
// __dirname - absolute path of the directory containing the currently executing file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // default get request - respond with bundled index.html file in build folder
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
