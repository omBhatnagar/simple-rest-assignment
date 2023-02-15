const { v4: uuidv4 } = require("uuid");

// Model
const { Posts } = require("..database/models");

// Service return handler
const serviceErrorHandler = require("../util/service.errorhandler");

exports.createPosts = async ({ postTitle, postBody }) => {
	try {
		// Check if fields are empty
		if (!postTitle || !postBody) throw new Error("Fields cannot be empty!");

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

exports.getPosts = async () => {
	try {
		// Fetch all posts
		const posts = await Posts.findAll();
		return { status: true, body: posts };
	} catch (error) {
		return serviceErrorHandler(error);
	}
};

exports.updatePosts = async ({ postId, postTitle, postBody }) => {
	try {
		// Check if post exists
		const post = Posts.findByPk(postId);
		if (post === null) throw new Error("No post found!");

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

exports.deletePosts = async (postId) => {
	try {
		// Check if post exists
		const post = await Posts.findByPk(postId);
		if (post === null) throw new Error("Post does not exists!");

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
