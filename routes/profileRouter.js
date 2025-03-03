const profileRouter = require("express").Router();
const {
  getMyProfile,
  postJoinMembership,
  postLeaveMembership,
} = require("../controllers/profileController");

profileRouter.get("/", getMyProfile);
profileRouter.post("/join/:id", postJoinMembership);
profileRouter.post("/leave/:id", postLeaveMembership);

module.exports = profileRouter;
