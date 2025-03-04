const postRouter = require("express").Router();
const {
  getPostsMain,
  getMakeNewPost,
} = require("../controllers/postController");

postRouter.get("/", getPostsMain);
postRouter.get("/new", getMakeNewPost);
//TODO VALIDATOR MIDDLEWARE FOR POST

module.exports = postRouter;
