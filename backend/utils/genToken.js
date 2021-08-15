// with the help of jsonwebtoken lib. we will genrate and asign unique token to the documents added.

const jwt = require("jsonwebtoken");


 const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports =  genToken ;
