require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 4521;
const express = require("express");
require('ejs')
const app = express();
const path = require('path');


// Set up database connection
require("./src/db/dbConnection");

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Middleware to parse incoming requests
app.use(express.static(path.join(__dirname,'Public')))
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./src/routes/home.route"));
app.use("/users", require("./src/routes/users.route"));
app.use("/api", require("./src/routes/api.route"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.APP_URI}`);
});
