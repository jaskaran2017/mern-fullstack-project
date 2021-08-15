const express = require("express");
const { registerUser, authUser } = require("../controller/userControllers");
const router = new express.Router();

// router.get('/api/user',(req,res)=>{
//     res.send("heloo jass");
//     console.log("jassss")
// })

// api for new user resitration
router.route("/").post(registerUser);
// api for user login
router.route("/login").post(authUser);

module.exports = router;
