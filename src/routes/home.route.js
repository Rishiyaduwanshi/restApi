require("dotenv").config({path : '../../.env'})
const router = require("express").Router();
const APP_URI = process.env.APP_URI;


router.get("/", (req, res) => {
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


module.exports = router 