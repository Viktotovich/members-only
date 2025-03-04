const postRouter = require("express").Router();
const { getPostsMain } = require("../controllers/postController");

postRouter.get("/", getPostsMain);

module.exports = postRouter;
