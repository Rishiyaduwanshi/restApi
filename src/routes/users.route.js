require("dotenv").config({path : '../../.env'})
const APP_URI = process.env.APP_URI;
const router = require("express").Router();
const { getUsers, getUserWithId } = require("../handlers/getUsers.handler");

router.get("/", getUsers);
router.get("/:studentId", getUserWithId);

module.exports = router;
