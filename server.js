const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables (Stripe secret key) from .env file into process.env (user environment) so that they are hidden
if (process.env !== "production") require("dotenv").config();

// Stripe library returns a function that expects secret key as first param
// Immediately invoke function, which returns Stripe object that we can use to make charge
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//*********************************************

// allows window.fetch API on Node.js runtime (for unsplash.js)
global.fetch = require("node-fetch");

// allows us to include config parameters in a more elegant way
// const config = require("universal-config");

// unsplash has multiple exports. we want default
const Unsplash = require("unsplash-js").default;
// gives us json from request
const toJson = require("unsplash-js").toJson;

// instantiate unsplash object - takes in all of our parameters from .env file
// used to make requests to api
const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET,
  callbackUrl: process.env.CALLBACK_URL || "http://localhost:3000",
});

//*********************************************

// Instantiate a new node server with express
const app = express();

// Use process environment's port or 5000
const port = process.env.PORT || 5000;

// Parse body of all incoming requests to JSON
app.use(bodyParser.json());

// Parse URL-encoded bodies - make sure url contains only valid characters.
app.use(bodyParser.urlencoded({ extended: true }));

// Cors middleware enables us to make requests from different origins (FEND/BEND)
app.use(cors());

/* Serve client application (in production, live node server will run on a Heroku url)
    • static middleware - serves static files from build folder
    • path.join joins all path segments together separated by '/'
    • __dirname - absolute path of the directory containing the currently executing file */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // default get request - respond with bundled index.html file in build folder
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// listen for connections
app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

//************************************
// get collections photos
app.get("/api/photos", (req, res) => {
  unsplash.collections
    .getCollectionPhotos(req.query.id, req.query.page, req.query.perPage)
    .then(toJson)
    .then((json) => res.json(json))
    .catch((error) => {
      console.log("error", error);
    });
});
//************************************

// FEND sends payment req with token object -> express sends payment to Stripe -> Stripe creates charge -> res back to client
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
