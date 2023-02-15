const Express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Initializing app
const app = Express();

// Initializing dotenv
dotenv.config();

// Importing routes and helper functions
const routes = require("./routes");
const { handleError } = require("./helpers/error");

// Middleware
// Using cors to disable cross origin resource sharing
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((error, req, res, next) => {
	handleError(error, res);
});

module.exports = app;
