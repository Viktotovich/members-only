const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getPostsMain = (req, res) => {
  const title = "All messages";
  const messages = db.getAllMessages();
  //
};
