const {
	getPosts,
	createPosts,
	updatePosts,
	deletePosts,
} = require("../services/posts.service");
const controllerErrorHandler = require("../util/controller.errorhandler");
const { notFound, badRequest } = require("../util/controllerBadResponse");

exports.getPosts = async (req, res, next) => {
	try {
		// Fetch posts
		const posts = await getPosts();
		if (posts.status) {
			if (posts.body.length > 0)
				return res.status(200).send({
					status: true,
					code: 200,
					data: posts.body,
				});
			// Return 404 response if no posts found
			return notFound(res);
		}
	} catch (error) {
		return next(controllerErrorHandler(error));
	}
};

exports.createPost = async (req, res, next) => {
	const { postTitle, postBody } = req.body;
	try {
		// Call service to create post
		const post = await createPosts(postTitle, postBody);
		if (post.status === true)
			return res.status(201).send({
				status: true,
				code: 201,
				data: post.body,
			});
		// Return bad request if service returns error of empty fields
		return badRequest(res, post.message);
	} catch (error) {
		return next(controllerErrorHandler(error));
	}
};

exports.updatePost = async (req, res, next) => {
	const { postTitle, postBody } = req.body;
	const { postId } = req.params;
	try {
		// Call service to update post
		const post = await updatePosts(postId, postTitle, postBody);
		if (post.status === true)
			return res.status(201).send({
				status: true,
				code: 201,
				message: "Post updated.",
			});
		// Throw error if service returned error
		if (post.status === "error") throw new Error(post.error);

		// Send not foud response if service returned not found
		return notFound(res);
	} catch (error) {
		return next(controllerErrorHandler(error));
	}
};

exports.deletePost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		// Delete post
		const post = await deletePosts(postId);
		if (post.status === true)
			return res.status(200).send({
				status: true,
				code: 200,
				message: "Post deleted.",
			});
		// Throw error if service returned error
		if (post.status === "error") throw new Error(post.error);

		// Return not found
		return notFound(res);
	} catch (error) {
		return next(controllerErrorHandler(error));
	}
};
