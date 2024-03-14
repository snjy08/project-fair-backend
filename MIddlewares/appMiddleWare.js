const appMiddleWare = (req,res,next)=>{
    console.log("inside the appMiddleware");
    next()
}
module.exports = appMiddleWare