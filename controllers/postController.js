const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getPostsMain = async (req, res) => {
  const title = "All messages";
  const posts = await db.getAllMessages();
  const approved = checkApproval(req.user.membership_status);
  if (req.isAuthenticated) {
    const isAdmin = await adminCheck(req.user.id);
    res.render("pages/posts", { title, posts, approved, isAdmin });
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
