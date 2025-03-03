const profileRouter = require("express").Router();
const { getMyProfile } = require("../controllers/profileController");

profileRouter.get("/", getMyProfile);

module.exports = profileRouter;
