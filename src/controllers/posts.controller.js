const { ErrorHandler } = require("../helpers/error");
const {
	getPostsService,
	createPostService,
	updatePostService,
	deletePostService,
} = require("../services/posts.service");

exports.getPosts = async (req, res, next) => {
	try {
		// Fetch posts
		const posts = await getPostsService();

		// Check if service returned error
		if (posts instanceof ErrorHandler) return next(posts);

		if (posts.status) {
			if (posts.body.length > 0)
				return res.status(200).send({
					status: true,
					code: 200,
					data: posts.body,
				});
		}
	} catch (error) {
		return next(error);
	}
};

exports.createPost = async (req, res, next) => {
	const { postTitle, postBody } = req.body;
	try {
		// Call service to create post
		const post = await createPostService(postTitle, postBody);
		// Check if service returned error
		if (post instanceof ErrorHandler) return next(post);
		if (post.status)
			return res.status(201).send({
				status: true,
				code: 201,
				data: post.body,
			});
		// Return bad request if service returns error of empty fields
		// return badRequest(res, post.message);
	} catch (error) {
		return next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	const { postTitle, postBody } = req.body;
	const { postId } = req.params;
	try {
		// Call service to update post
		const post = await updatePostService(postId, postTitle, postBody);

		// Check if service returned error
		if (post instanceof ErrorHandler) return next(post);

		if (post.status)
			return res.status(201).send({
				status: true,
				code: 201,
				message: "Post updated.",
			});
	} catch (error) {
		return next(error);
	}
};

exports.deletePost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		// Delete post
		const post = await deletePostService(postId);

		// Check if service returned error
		if (post instanceof ErrorHandler) return next(post);

		if (post.status)
			return res.status(200).send({
				status: true,
				code: 200,
				message: "Post deleted.",
			});
	} catch (error) {
		return next(error);
	}
};
