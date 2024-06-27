require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4521;
const APP_URI = process.env.APP_URI;
require("./src/db/dbConnection");
const users = require("./src/models/mockdata.schema");
const getNextStudentId = require("./src/utils/getNextStudentID");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Endpoint to list all users with HTML list format
app.get("/users", async (req, res) => {
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

// // Endpoint to get a specific user by studentId
app.get("/users/:studentId", async (req, res) => {
  const student_id = req.params.studentId;
  const user = await users.findOne({ student_id: student_id });
  console.log(user);
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

// Endpoint to get all users (API version)
app
  .route("/api/users")
  .get(async (req, res) => {
    res.json(await users.find({}));
  })
  .post(async (req, res) => {
    try {
      const newUser = {
        ...req.body,
        student_id: await getNextStudentId(),
      };
      const newUserCreated = await users.create(newUser);
      res.json({
        status: "Success",
        "Student ID: ": newUserCreated.student_id,
      });
    } catch (err) {
      console.error("Error in creating users" + err);
      res.status(501).send("Failed to create user");
    }
  });

// Endpoint to get a specific user by studentId and handle PUT and PATCH methods
app
  .route("/api/users/:student_id")
  .get(async (req, res) => {
    const student_id = req.params.student_id;
    const user = await users.find({ student_id });
    try {
      if (user.length != 0) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      res.status(404).send("User not found" + err);
    }
  })
  .patch(async (req, res) => {
    const studentId = parseInt(req.params.student_id);
    const updates = req.body;
    const user = await users.findOne({student_id : studentId})
    try {
      updates["full_name"] = `${updates.first_name || user.first_name} ${updates.last_name || user.last_name}` 
      const updatedUser = await users.findOneAndUpdate(
        { student_id: studentId },
        { $set: updates },
        { new: true }
      );

      if (updatedUser) {
        res.json({
          status: "User updated successfully",
          "updated value": updatedUser,
        });
      } else {
        res
          .status(404)
          .json({ status: "User not found", "Student ID": studentId });
      }
    } catch (err) {
      console.error("Error in updating user:", err.message);
      res.status(500).json({ Error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const tempStudentId = parseInt(req.params.student_id);
      const result = await users.deleteOne({ student_id: tempStudentId });
      if (result.deletedCount === 1) {
        res.status(200).json({
          status: "User deleted successfully",
          "Student ID": tempStudentId,
        });
      } else {
        res
          .status(404)
          .json({ status: "User not found", "Student ID": tempStudentId });
      }
    } catch (err) {
      console.error("Error in deleting user:", err);
      res.status(500).json({ Error: err.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.APP_URI}`);
});
