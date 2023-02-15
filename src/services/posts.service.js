const { v4: uuidv4 } = require("uuid");

// Model
const { Posts } = require("../database/models");
// Helpers
const checkIfValidUUID = require("../helpers/checkIfValidUuid");
const { ErrorHandler } = require("../helpers/error");

exports.createPostService = async (postTitle, postBody) => {
	try {
		// Check if fields are empty
		if (!postTitle || !postBody)
			return new ErrorHandler(400, "Fields cannot be empty.");

		// Create post in Posts table
		const createdPost = await Posts.create({
			postId: uuidv4(),
			postTitle,
			postBody,
		});
		return { status: true, body: createdPost };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.getPostsService = async () => {
	try {
		// Fetch all posts
		const posts = await Posts.findAll();
		// Check if posts is empty
		if (posts.length < 1) return new ErrorHandler(404, "No posts found.");
		return { status: true, body: posts };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.updatePostService = async (postId, postTitle, postBody) => {
	try {
		// Check if postId is valid uuid
		if (!checkIfValidUUID(postId))
			return new ErrorHandler(400, "Post ID is not a valid UUID");

		// Check if post exists
		const post = await Posts.findByPk(postId);
		if (post === null) return new ErrorHandler(404, "No post found.");

		// Update post
		await Posts.update(
			{
				postTitle,
				postBody,
			},
			{
				where: {
					postId,
				},
			},
		);

		return { status: true };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.deletePostService = async (postId) => {
	try {
		// Check if postId is valid uuid
		if (!checkIfValidUUID(postId))
			return new ErrorHandler(400, "Post ID is not a valid UUID");

		// Check if post exists
		const post = await Posts.findByPk(postId);
		if (post === null) return new ErrorHandler(404, "Post not found.");

		// Delete post
		await Posts.destroy({
			where: {
				postId,
			},
		});

		return { status: true };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
