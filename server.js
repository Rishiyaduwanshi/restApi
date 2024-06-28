require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4521;
require("./src/db/dbConnection");
const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",require("./src/routes/home.route"))
app.use("/users", require("./src/routes/users.route"))
app.use("/api", require("./src/routes/api.route"))





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.APP_URI}`);
});
