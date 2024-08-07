const { saveRedirectUrl } = require("../middleware.js");
const User = require("../models/user.js");
const passport = require("passport");
// Render signUp form
module.exports.signUp = (req, res) => {
  res.render("../views/users/signup.ejs");
};
// SignUp Users
module.exports.signUpUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
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
};
//Render Login page
module.exports.renderLoginPage = async (req, res) => {
  res.render("../views/users/login.ejs");
};
// Login users
(module.exports.loginUser = saveRedirectUrl),
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "welcome to WonderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "your successfuly logged out");
    res.redirect("/listings");
  });
};
