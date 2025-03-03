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
