require("dotenv").config({path : '../../.env'})
const router = require("express").Router();
const APP_URI = process.env.APP_URI;

router.get("/", (req, res) => {
  res.render('home',{APP_URI,})
});


module.exports = router 