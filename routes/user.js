const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("../views/users/signup.ejs")
});

router.post("/signup", wrapAsync( async(req,res)=>{
    try {
         let { username, email, password } = req.body;
         const newUser = new User({ email, username });
         const registeredUser = await User.register(newUser, password);
         req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }

            req.flash("success", "user was registered");
            res.redirect("/listings");
         });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
        console.log(error);
    }
   
}));

router.get("/login", async(req,res)=>{
    res.render("../views/users/login.ejs");
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    async(req,res) =>{
        req.flash("success","welcome to WonderLust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

router.get("/logout",(req,res,next)=>{
    req.logout((err) =>{
        if(err){
           return next(err);
        }
        req.flash("success", "your successfuly logged out");
        res.redirect("/listings")
    })
})
module.exports = router;