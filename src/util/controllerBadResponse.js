exports.notFound = (res) =>
	res.status(404).send({
		status: true,
		code: 404,
		message: "Not found.",
	});
exports.badRequest = (res, message) =>
	res.status(400).send({
		status: true,
		code: 400,
		message,
	});
