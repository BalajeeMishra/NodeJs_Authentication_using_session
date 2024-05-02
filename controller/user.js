const bcrypt = require("bcrypt");
const User = require("../model/user")

const registerUser = async(req,res,next) =>{
    try{
    const {userName,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        userName,
        password:hashedPassword
    })
    await newUser.save();
    req.session.userId= newUser.id;
    return res.status(200).json({message:"user registered successfully"});
}
catch(err){
    console.log(err)
    return next(err);
}

} 
const loginUser = async(req,res,next)=>{
    try{
    const {userName,password} = req.body;
    const user = await User.findOne({userName});
    if(user){
        const hashedPassword = user.password;
        const checkpassword= await bcrypt.compare(password, hashedPassword);
        if(checkpassword){
            req.session.userId= user.id;
            return res.status(200).json({message:"You are logged in"})
        }  
        else{
            return res.status(404).json({message:"wrong credential"})
        }
    }
    else{
        return res.status(404).json({message:"wrong credential"})
    }
}
catch(err){
    return next(err)
}
}

const logout = async(req,res,next)=>{
    try{
    if(!req.session.userId){
        return res.status(500).json({message:"Something went wrong!"});
    }
    delete req.session.userId;
    return res.status(200).json({message:"Logout Successfully"});
    }
    catch(err){
        return next(err);
    }
}



module.exports = {registerUser,loginUser,logout};