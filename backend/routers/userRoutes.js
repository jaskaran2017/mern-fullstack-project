const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controller/userControllers");
const { protector } = require("../middleware/authMiddleware");
const router = new express.Router();

// router.get('/api/user',(req,res)=>{
//     res.send("heloo jass");
//     console.log("jassss")
// })

// api for new user resitration
router.route("/").post(registerUser);
// api for user login
router.route("/login").post(authUser);
//api or route for editing or updating the user profile
router.route("/profile").post(protector, updateUserProfile);

module.exports = router;
