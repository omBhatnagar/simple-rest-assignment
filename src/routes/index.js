const router = require("express").Router();

// Importing routes for posts
const postRoutes = require("./posts.routes");

// Routes for Posts
router.use("/posts", postRoutes);

module.exports = router;
