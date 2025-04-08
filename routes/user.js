const express = require("express");
let router = express.Router();
const passportLocal = require("passport-local");

const User = require("../model/user.js");
const { Passport } = require("passport");
const passport = require("passport");
const { route } = require("./cards");


// login 
router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

router.post("/login", passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash:true
}), async(req,res)=>{

      req.flash("success", "wellcome to E-Cart", req.user.username);
            res.redirect("/cards");
})


//signUp

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
})
router.post("/signup", async(req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });

        const register = await User.register(newUser, password);
        
        req.login(register, (err) => {
            if (err) { 
                return next(err);  // `next(err)` properly handle 
            }
            
            req.flash("success", "Welcome to E-cart, ",  username);
             res.redirect("/cards");  // Yahan redirect 
        });

    } 
      catch (err) {
        req.flash("error", err.message)
        return res.redirect("/signup");
       }
});

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            req.flash("error", "User is not define");
        }
        req.flash("success", "you are logged Out!")
    })
    res.redirect("/cards")


});

module.exports = router;
