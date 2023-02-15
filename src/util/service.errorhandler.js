const serviceErrorHandler = (error) => {
	return {
		status: false,
		error: error.message,
	};
};

module.exports = serviceErrorHandler;
