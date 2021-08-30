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

const updateUserProfile = async_handler(async (req, res) => {
  //to make sure that the user is real owner of the profile who wants to update his/her profile
  //first we will get the id then let them to access the edit profile page
  const user = await User.findById(req.user._id);

  // once the user is authenticated by getting id then
  if (user) {
    //then the user can update the below things
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    // but only by entring his/her password so,
    if (req.body.password) {
      user.password = req.body.password;
    }
    // after the above conditions are met then the updated user will be saved as user
    const updatedUser = await user.save();
    // after the updated user info has been saved then it will be sent to frontend as response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: genToken(updatedUser._id),
    });
  } else {
    res.json(404);
    throw new Error("User not found !");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
