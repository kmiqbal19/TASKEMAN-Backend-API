const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email address"],
      unique: [true, "This email address is already in use!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm the password!"],
      validate: {
        validator: function(element) {
          return element === this.password;
        },
        message: "Passwords are not equal",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    photo: {
      type: String,
      dafault: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// SCHEMA PRE SAVE MIDDLEWARE
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    // Encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  } catch (err) {
    next(err);
  }
  next();
});
// SCHEMA METHODS
userSchema.methods.checkPassword = async function(givenPass, originalPass) {
  return await bcrypt.compare(givenPass, originalPass);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
