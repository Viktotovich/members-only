const postRouter = require("express").Router();
const {
  getPostsMain,
  getMakeNewPost,
} = require("../controllers/postController");
const { validateNewPost } = require("../validators/validators");

postRouter.get("/", getPostsMain);
postRouter.get("/new", getMakeNewPost);
//TODO: the controller
postRouter.post("/new", [validateNewPost]);

module.exports = postRouter;
