require("dotenv").config({ path: "../../.env" });
const express = require("express");
const APP_URI = process.env.APP_URI;
const router = express.Router();
const users = require("../models/mockdata.schema");

router.get("/", async (req, res) => {
  const userList = await users.find({});
  const userListHtml = userList
    .map((user) => `<li>${user.full_name}</li>`)
    .join("");
  try {
    res.send(`
        <h1>List of users:</h1>
        <a href="${APP_URI}">Click to go home page</a>
        <ol>${userListHtml}</ol>
      `);
  } catch (err) {
    console.error("Error in fetching users " + err);
    res.status(501).send("Error in fetching users " + err);
  }
});

//users/:student_id route
router.get("/:studentId", async (req, res) => {
  const student_id = req.params.studentId;
  const user = await users.findOne({ student_id: student_id });
  if (user) {
    res.send(`
        <body>
          <center>
            <a href="${APP_URI}">Click to go home page</a>
            <br/><br/><br/>
            USER DETAILS:<br/>
            full_name:${user.full_name}<br/>
            Student ID:${user.student_id}<br/>
            first_name:${user.first_name}<br/>
            last_name:${user.last_name}<br/>
            age:${user.age}<br/>
            email:${user.email}<br/>
            major:${user.major}<br/>
            gpa:${user.gpa}<br/>
            enrollment_date:${user.enrollment_date.toLocaleDateString()}<br/>
            graduation_date:${user.graduation_date.toLocaleDateString()}
          </center>
        </body>
      `);
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
