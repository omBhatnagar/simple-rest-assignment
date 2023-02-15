const { getPosts, createPosts } = require("../services/posts.service");
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
		const post = await createPosts(postTitle, postBody);
		if (post.status)
			return res.status(201).send({
				status: true,
				code: 201,
				data: post.body,
			});
		return badRequest(res, post.message);
	} catch (error) {
		return next(controllerErrorHandler(error));
	}
};
