const { v4: uuidv4 } = require("uuid");

// Model
const { Posts } = require("../database/models");

// Service return handler
const serviceErrorHandler = require("../util/service.errorhandler");

exports.createPostService = async (postTitle, postBody) => {
	try {
		// Check if fields are empty
		if (!postTitle || !postBody)
			return {
				status: false,
				message: "Fields cannot be empty!",
			};

		// Create post in Posts table
		const createdPost = await Posts.create({
			postId: uuidv4(),
			postTitle,
			postBody,
		});
		return { status: true, body: createdPost };
	} catch (error) {
		return serviceErrorHandler(error);
	}
};

exports.getPostsService = async () => {
	try {
		// Fetch all posts
		const posts = await Posts.findAll();
		return { status: true, body: posts };
	} catch (error) {
		return serviceErrorHandler(error);
	}
};

exports.updatePostService = async (postId, postTitle, postBody) => {
	try {
		// Check if post exists
		const post = await Posts.findByPk(postId);
		if (post === null)
			return {
				status: false,
				message: "No post found!",
			};

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
		return serviceErrorHandler(error);
	}
};

exports.deletePostService = async (postId) => {
	try {
		// Check if post exists
		const post = await Posts.findByPk(postId);
		if (post === null) return { status: false, message: "Post not found" };

		// Delete post
		await Posts.destroy({
			where: {
				postId,
			},
		});

		return { status: true };
	} catch (error) {
		return serviceErrorHandler(error);
	}
};
