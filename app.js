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
const session = require("express-session");
const User = require("./models/user.js");

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

app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false,
}));

// Middleware to make user info available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

const unprotectedRoutes = ["/login", "/signup"];
app.use((req, res, next) => {
  if (
    unprotectedRoutes.includes(req.path) ||
    req.path.startsWith("/public")
  ) {
    return next();
  }
  if (!req.session.userId) {
    return res.redirect("/signup");
  }
  next();
});

app.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/signup");
  }
  res.redirect("/listings");
});

// Middleware to require login
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Protect listings routes
app.get(
  "/listings",
  requireLogin,
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    console.log("these are all listings", allListings)
    res.render("listings/index.ejs", { allListings });
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
app.get("/listings/new", requireLogin, (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get(
  "/listings/:id",
  requireLogin,
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
  "/listings",
  requireLogin,
  validateListing,
  wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    const newListing = new Listing(listingData);
    await newListing.save();
    res.redirect("/listings"); // Redirect to listings page after creation
  })
);

// Edit route
app.get(
  "/listings/:id/edit",
  requireLogin,
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
  requireLogin,
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
  requireLogin,
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
  requireLogin,
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
// app.delete(
//   "/listings/:listingId/reviews/:reviewId",
//   wrapAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
//   })
// );
app.delete(
  "/listings/:listingId/reviews/:reviewId",
  requireLogin,
  wrapAsync(async (req, res) => {
    const { listingId, reviewId } = req.params; // ✅ Corrected
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${listingId}`);
  })
);

app.get("/signup", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/listings");
  }
  res.render("signup.ejs");
});

app.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).render("signup.ejs", { error: "Username or email already exists." });
    }
    const user = new User({ username, email, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

app.get("/login", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/listings");
  }
  res.render("login.ejs");
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).render("login.ejs", { error: "Invalid username or password." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).render("login.ejs", { error: "Invalid username or password." });
    }
    req.session.userId = user._id;
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/signup");
  });
});


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
  console.log("Server is listening on port 8080"); // Corrected typo
});
//initilaize commands
//cd majorproject
//node app.js
//cd init
//node index.js