
const router = require("express").Router();
const users = require("../models/mockdata.schema");
const {
  createApiUsers,
  getApiUsersWithId,
  updateApiUsersWithId,
  deleteApiusersWithId,
} = require("../handlers/apiUsers.handler");

//api/users route
router
  .route("/users")
  .get(async (req, res) => {
    res.json(await users.find({}));
  })
  .post(createApiUsers);

// api/users/:student_id route
router
  .route("/users/:student_id")
  .post(createApiUsers)
  .get(getApiUsersWithId)
  .patch(updateApiUsersWithId)
  .delete(deleteApiusersWithId);

module.exports = router;
