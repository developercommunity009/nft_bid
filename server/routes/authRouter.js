const express = require("express");
const authController = require("../controller/authController");
const enquery = require("../controller/enqueryController")

const router = express.Router();

router.route("/singup").post(authController.singup);
router.route("/login").post(authController.login);
router.route("/googleuser").post(authController.googleLogin);

router.route("/whislist").put( authController.protect ,authController.whislist);
router.route("/whislist-list").get( authController.protect ,authController.getWhislist);
router.route("/following").put(authController.protect ,authController.following);
router.route("/followers-list").get( authController.protect ,authController.getFollowers);

router.route("/forgetpassword").post(authController.forGetPassword);
router.route("/resetpassword/:token").patch(authController.reSetPassword);
router.route("/updatingpassword").patch(authController.protect, authController.updatingPassword);
router.route("/create-enquery").post(authController.protect , enquery.createEnquery);

module.exports = router;