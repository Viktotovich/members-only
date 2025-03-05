const postRouter = require("express").Router();
const {
  getPostsMain,
  getMakeNewPost,
  postMakeNewPost,
} = require("../controllers/postController");
const { validateNewPost } = require("../validators/validators");

postRouter.get("/", getPostsMain);
postRouter.get("/new", getMakeNewPost);
postRouter.post("/new", [validateNewPost, postMakeNewPost]);

module.exports = postRouter;
