// here we will customized errors to display for a nice user experience. when ever any error occurs these functions will replace the default browser error into easy readable format.

// if the route is not found  or dosen't exists then throw this error:-
const notFound=(req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


// for the all other types of errors will be displayed by this err function

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack: process.env.NODE_NAV === "production" ? null : err.stack,
    })
}
 module.exports = {notFound, errorHandler};