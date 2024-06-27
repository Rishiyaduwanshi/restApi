const users = require("../models/mockdata.schema");

const getNextStudentId = async () => {
  try {
    const allUsers = await users.find({}, { student_id: 1 }).sort({ student_id: 1 }); 
    let expectedId = 1;
    for (const user of allUsers) {
      if (user.student_id !== expectedId) {
        // Found a gap
        return expectedId;
      }
      expectedId++;
    }

    // If no gaps were found, return the next ID in sequence
    return expectedId;
  } catch (error) {
    console.error("Error fetching student ID:", error);
    throw error; 
  }
};

module.exports = getNextStudentId;
