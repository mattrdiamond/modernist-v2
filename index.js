import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import compression from "compression";
import { createApi } from "unsplash-js";
import admin from "firebase-admin";
import Stripe from "stripe";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Create ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
if (process.env.NODE_ENV !== "production") dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Service account authenticates server with firebase
import serviceAccount from "./config/serviceAccount.js";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
});

// Instantiate a new node server with express
const app = express();

// Use process environment's port or 5001
const port = process.env.PORT || 5001;

/* ---------------------- Middleware ---------------------- */
app.use(compression()); // Enables gzip compression for the responses sent from server to client
app.use(bodyParser.json()); // Parse body of all incoming requests to JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming URL-encoded data from HTML forms - make sure url contains only valid characters. Extended: true allows for more complex data structures to be parsed, such as nested objects and arrays
app.use(cors()); // Allows server to respond to requests from a different origin (domain) than the one that served the webpage

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

/* ---------------------- Routes ---------------------- */
app.get("/api/photos", getUnsplashPhotos);

// Set up static file server using express.static middleware
// Serves static files from build folder in production mode
// path.join joins all path segments together separated by '/'
// __dirname - absolute path of the directory containing the currently executing file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  // default get request
  app.get("*", serveStaticFile);
}

app.post("/payment", handlePayment);
app.post("/api/validatePromoCode", validatePromoCode);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

/* ---------------------- Route Handlers ---------------------- */
async function getUnsplashPhotos(req, res) {
  try {
    const { id, page = 1, perPage = 20, orderBy } = req.query;

    const photoData = await unsplash.collections.getPhotos({
      collectionId: id,
      page,
      perPage,
      orderBy,
    });

    res.json(photoData.response.results);
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Serve bundled index.html file in build folder
function serveStaticFile(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
}

// Stripe - client sends payment req with token object -> express sends payment to Stripe -> Stripe creates charge -> res back to client
function handlePayment(req, res) {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      console.log("ERROR", stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      console.log("success");
      res.status(200).send({ success: stripeRes });
    }
  });
}

async function validatePromoCode(req, res) {
  try {
    const { promoCode } = req.body;
    const validCode = await validatePromoCodeHelper(promoCode);

    if (validCode.isValid) {
      res.status(200).json({
        isValid: true,
        code: validCode.code,
        message: "Promo code is valid",
      });
    } else {
      res.status(400).json(validCode);
    }
  } catch (error) {
    console.error("Error validating promo code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function validatePromoCodeHelper(promoCode) {
  try {
    const promoRef = admin.firestore().collection("promos").doc(promoCode);
    const docSnapshot = await promoRef.get();

    if (docSnapshot.exists) {
      const promoData = docSnapshot.data();
      return { isValid: true, code: promoData.code };
    } else {
      console.log("Promo code not found");
      return { isValid: false, message: "Invalid promo code" };
    }
  } catch (error) {
    throw error;
  }
}
