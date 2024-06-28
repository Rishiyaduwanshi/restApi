const express = require("express");
const getNextStudentId = require("../utils/getNextStudentID");
const router = express.Router();
const users = require("../models/mockdata.schema");




//api/users route 
router
  .route("/users")
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

// api/users/:student_id route 
router
  .route("/users/:student_id")
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




  module.exports = router;