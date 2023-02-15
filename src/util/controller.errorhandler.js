const { DatabaseError } = require("sequelize");

const controllerErrorHandler = (error) => {
	if (error instanceof DatabaseError) error.httpStatusCode = 500;
	return error;
};

module.exports = controllerErrorHandler;
