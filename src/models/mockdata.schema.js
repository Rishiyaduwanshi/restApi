const mongoose = require("mongoose");

function capitalizeFirstLetterOfEachWord(fullName) {
  return fullName.replace(/\b\w/g, (char) => char.toUpperCase());
}

const userSchema = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      unique: true,
    },
    first_name: {
      type: String,
      trim: true,
      set: capitalizeFirstLetterOfEachWord,
    },
    last_name: {
      type: String,
      trim: true,
      set: capitalizeFirstLetterOfEachWord,
    },
    full_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    major: {
      type: String,
      set: capitalizeFirstLetterOfEachWord,
    },
    gpa: {
      type: Number,
    },
    enrollment_date: {
      type: Date,
    },
    graduation_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to set fullName
userSchema.pre("save", function (next) {
  this.full_name = `${this.first_name} ${this.last_name}`;
  next();
});

module.exports = mongoose.model("User", userSchema);
