const postRouter = require("express").Router();
const {
  getPostsMain,
  getMakeNewPost,
  postMakeNewPost,
  postDelete,
} = require("../controllers/postController");
const { validateNewPost } = require("../validators/validators");

postRouter.get("/", getPostsMain);
postRouter.get("/new", getMakeNewPost);
postRouter.post("/new", [validateNewPost, postMakeNewPost]);
postRouter.post("/delete/:id", postDelete);

module.exports = postRouter;
