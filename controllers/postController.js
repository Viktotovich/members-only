const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getMessagersMain = (req, res) => {
  const title = "All messages";
  //db call to get all messages / 5
};
/*
    Scaffold, Reddit like - don't load all the posts, SQL it to be 5 posts and have like a next button or something - WE ARE NOT GOING TO LOAD ALL MESSAGES WITH A SERVERLESS SERVER

    We are going to use it in a real prod app vandbruno.org
*/
