const isLoggedIn= (req,res,next) =>{
    if(req.session.userId){
        return next();
    }
    return res.status(400).json({message:"You have to sigin first!"});
}

module.exports = isLoggedIn