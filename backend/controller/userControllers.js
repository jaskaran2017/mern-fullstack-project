// the function of the controller is to save the data into database and saves all the logic behind the api functions

const async_handler = require("express-async-handler");
const User = require("../model/userModel"); //coming from models folder
const genToken = require("../utils/genToken");
// const jwt = require("jsonwebtoken");

// function for New user registration
const registerUser = async_handler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  //here we will put a check to see if the user already existed? if not only then we will register new user.
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }
  //after the above check passed, now time to register for the new user
  const user = await User.create({
    name,
    email,
    password,
    profilePic,
  });
  // now we will check that is the new user has been created? if yes we will send data accept the password as confirmation..
  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong. Please try after some time.");
  }
  // } catch (e) {
  //   res.status(500).send(e);
  //   console.log(e);
  // }
});

// function for login api
const authUser = async_handler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password.");
  }
  // } catch (e) {
  //   res.status(500).send(e);
  //   console.log(e);
  // }
});

module.exports = { registerUser, authUser };
