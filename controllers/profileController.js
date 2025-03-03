const db = require("../db/queries");
const links = require("../links");

module.exports.getMyProfile = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const title = "My Profile";
    const id = req.user.id;
    const user = await db.getUserById(id);
    res.render("pages/my-profile.ejs", { user, title, links });
  } else {
    res.send(
      "<h1>You are not authenticated!</h1><p><a href='/login'>Login</a></p>"
    );
  }
};

module.exports.postJoinMembership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    await db.changeUserStatus("Member", req.user.id);
    res.redirect("/profile");
  } else {
    res.send(401);
  }
};

module.exports.postLeaveMembership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    await db.changeUserStatus("Not a Member", req.user.id);
    res.redirect("/profile");
  } else {
    res.send(401);
  }
};
