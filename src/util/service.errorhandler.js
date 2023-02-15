const serviceErrorHandler = (error) => {
	return {
		status: "error",
		error: error.message,
	};
};

module.exports = serviceErrorHandler;
