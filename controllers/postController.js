const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getPostsMain = async (req, res) => {
  const title = "All messages";
  const posts = await db.getAllMessages();
  const approved = checkApproval(req.user.membership_status);

  //
};

function checkApproval(membership_status) {
  if (membership_status === "Member") {
    return true;
  } else {
    return false;
  }
}
