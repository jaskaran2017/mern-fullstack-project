const jwt = require("jsonwebtoken");
const async_handler = require("express-async-handler");
const User = require("../model/userModel");

//whenever user logs in we will put this api_Protector function before getNotes api
// so the user has to pass this middleware to reach the getNotes api to stop unauthoriza access.
// const protector = (req, res, next) => {
//   console.log("hello jass");
//   next();
// };
const protector = async_handler(async (req, res, next) => {
  let token;
  // // the api protector will first check if the user request have headers and Bearer present in it
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //if the condition is found to be true then try block will be renderd
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      //decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if the token get verifird then the user will be find through the id decoded and put in the request
      // and finally given to the getNotes api.
      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      next();
    } catch (error) {
      //  if somthing went wrong then
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    //if not token found then
    // if (!token) {
    //   res.status(401);
    //   throw new Error("Not authorized, token failed");
    // }
  }
});
module.exports = { protector };
