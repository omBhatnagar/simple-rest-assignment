const router = require("express").Router();

// Importing controller
const {
	getPosts,
	createPost,
	updatePost,
} = require("../controllers/posts.controller");

// Create posts
router.post("/createpost", createPost);

// Get posts
router.get("/getposts", getPosts);

// Update posts
router.put("/updatepost/:postId", updatePost);

// Delete posts

module.exports = router;
