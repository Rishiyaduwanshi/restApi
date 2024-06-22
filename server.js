require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4521;
const APP_URI = process.env.APP_URI
const users = require("./MOCK_DATA.json");
const app = express();

app.use(express.json());

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
app.get("/users", (req, res) => {
  const userList = users.map((user) => `<li>${user.full_name}</li>`).join("");
  res.send(`
    <h1>List of users:</h1>
    <a href="${APP_URI}">Click to go home page</a>
    <ol>${userList}</ol>
  `);
});

// Endpoint to get a specific user by studentId
app.get("/users/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const user = users.find((user) => user.student_id === parseInt(studentId));

  if (user) {
    res.send(`
      <body>
        <center>
          <a href="${APP_URI}">Click to go home page</a>
          <br/><br/><br/>
          USER DETAILS:<br/>
          full_name: ${user.full_name}<br/>
          Student ID: ${user.student_id}<br/>
          first_name: ${user.first_name}<br/>
          last_name: ${user.last_name}<br/>
          age: ${user.age}<br/>
          email: ${user.email}<br/>
          major: ${user.major}<br/>
          gpa: ${user.gpa}<br/>
          enrollment_date: ${user.enrollment_date}<br/>
          graduation_date: ${user.graduation_date}
        </center>
      </body>
    `);
  } else {
    res.status(404).send("User not found");
  }
});

// Endpoint to get all users (API version)
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Endpoint to get a specific user by studentId and handle PUT and PATCH methods
app.route("/api/users/:studentId")
  .get((req, res) => {
    const studentId = req.params.studentId;
    const user = users.find((user) => user.student_id === parseInt(studentId));

    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  })
  .put((req, res) => {
    // Update user logic here
    res.json({ status: "Update operation pending..." });
  })
  .patch((req, res) => {
    // Patch user logic here
    res.json({ status: "Patch operation pending..." });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ${process.env.APP_URI}`);
});
