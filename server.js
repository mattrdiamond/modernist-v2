const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables (Stripe secret key) from .env file into process.env (user environment) so that they are hidden
if (process.env !== "production") require("dotenv").config();

// Stripe library returns a function that expects secret key as first param
// Immediately invoke function, which returns Stripe object that we can use to make charge
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
