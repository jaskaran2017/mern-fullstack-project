// define new user properties || creating schema for user
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email.");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Favatar-icon-placeholder-1577909%2F&psig=AOvVaw2p2oLjeoOKInSVxG0-AAB5&ust=1628812009982000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPCD9uCTqvICFQAAAAAdAAAAABAD",
    },
  },
  {
    timestamps: true,
  }
);
// encrypting or hashing the password using bcrypt.js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// decryting the password to check if the user has entered correct password when loging in the app

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;

// from here we will export this user to our controller. then the controller will save all the data into mongodb database.
