const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getPostsMain = async (req, res) => {
  const title = "All messages";
  const posts = await db.getAllMessages();
  console.log(posts);
  const approved = checkApproval(req.user.membership_status);
  if (req.isAuthenticated()) {
    const isAdmin = await adminCheck(req.user.id);
    res.render("pages/posts", {
      title,
      posts,
      approved,
      isAdmin,
    });
  } else {
    res.send(404); //Muahahaha
  }
};

module.exports.getMakeNewPost = (req, res) => {
  if (req.isAuthenticated()) {
    const title = "Make a New Post";
    res.render("pages/new-post", { title, links });
  } else {
    res.send(401);
  }
};

module.exports.postMakeNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const title = "Try making a new post again";
    res.redirect("/posts/new", { errors: errors.array(), title });
  } else if (req.isAuthenticated()) {
    await db.makeNewPost(req.body.message, req.user.id);
    res.redirect("/posts");
  } else {
    res.send(404);
  }
};

module.exports.postDelete = async function (req, res) {
  if (req.isAuthenticated() && (await adminCheck(req.user.id))) {
    const postId = req.params.id;
    await db.deleteMessageById(postId);
    res.redirect("back"); //CHANGE THIS AS IT IS DEPRECIATED
  } else {
    res.send(404);
  }
};

// Helper functions
function checkApproval(membership_status) {
  if (membership_status === "Member") {
    return true;
  } else {
    return false;
  }
}

async function adminCheck(id) {
  const isAdmin = await db.checkIfAdminById(id);
  if (isAdmin.length > 0) {
    return true;
  }
  return false;
}
