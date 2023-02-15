const router = require("express").Router();

// Importing controller
const { getPosts, createPost } = require("../controllers/posts.controller");

// Create posts
router.post("/createpost", createPost);
// Get posts
router.get("/getposts", getPosts);

// Update posts

// Delete posts

module.exports = router;
