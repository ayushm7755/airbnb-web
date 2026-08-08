const passport = require("passport");
const User = require("../Models/user.js");


module.exports.signup = (req,res)=>{
    res.render("./users/signup.ejs");
}; 

module.exports.signupPost = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({username , email});
        const registredUser = await User.register(newUser , password);
        console.log(registredUser);
        req.login(registredUser,(err) =>{
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust!");
            res.redirect("/listings");
        });  
       
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }  
};

module.exports.login = (req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.loginPost = async(req,res)=>{
    req.flash("success"," welcome back to the wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl );
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err); 
        }
        req.flash("success", "you are logout");
        res.redirect("/listings");
    });
};