const Express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Initializing app
const app = Express();

// Initializing dotenv
dotenv.config();

// Importing routes
const routes = require("./routes");

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
	console.log({ error });
	return res.status(error.httpStatusCode).send({
		message: error.message,
	});
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));
