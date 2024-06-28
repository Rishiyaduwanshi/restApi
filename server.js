require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const PORT = process.env.PORT || 4521;
const APP_URI = process.env.APP_URI;
require("./src/db/dbConnection");
const apiRoute = require("./src/routes/api.route")
const usersRoute = require("./src/routes/users.route")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRoute)
app.use("/api", apiRoute)

// Root endpoint
app.get("/", (req, res) => {
  res.send(` 
    <center> 
      <h1>Welcome to the website</h1>
      <br/>
      <a href="${APP_URI}/users/">Click to get users list</a>
      <br/><br/>
      <a href="${APP_URI}/api/users/">Click to get API</a>
    </center>
  `);
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.APP_URI}`);
});
