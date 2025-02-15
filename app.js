const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Ensure the correct path to the Listing model
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // Use const for MONGO_URL

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

async function main() {
  console.log("mongo url", MONGO_URL)
  await mongoose.connect(MONGO_URL); // Added recommended options
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure this path is correct

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    console.log("these are all listings", allListings)
    res.render("listings/index.ejs", { allListings }); // Corrected path for EJS rendering
  })
);

const validateListing = (req, res, next) => {
  console.log("validating", req.body)
  let {error} = listingSchema.validate(req.body);
 
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

const validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
 
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

// New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid listing ID");
    }
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// Create route
app.post(
  "/listings",validateListing,
  wrapAsync(async (req, res) => {
    console.log(req.body); // Log the entire request body
    const listingData = req.body.listing;
    console.log(listingData); // Log the parsed listing data
   
    const newListing = new Listing(listingData);
    

    await newListing.save();
    res.status(201).send("Listing created successfully");
  })
);

// Edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid listing ID");
    }
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// Update route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid listing ID");
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
  })
);

// Delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid listing ID");
    }
    const deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
  })
);

//review
//post route
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

//delete review route
// Delete review route
app.delete(
  "/listings/:listingId/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
});



// Error handling middleware
app.use((err, req, res, next) => {
    let{statusCode = 500 , message = "Something went wrong:"}= err;
    res.status(statusCode).render("error.ejs", {message});
    //res.status(statusCode).send(message);
  });
  
  
  

app.listen(port, () => {
  console.log("Server is listening on port ${port}"); // Corrected typo
});