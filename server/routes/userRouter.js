

const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const multer = require("multer");


const router = express.Router();
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return   cb(null, "/public/images");
    },
    filename: function (req, file, cb) {
     return cb(null, file.originalname);
    },
  });
  const upload = multer({ storage:storage });
  

// ROUTER USERS
router.route("/updateme").patch(authController.protect ,upload.single("image")  , userController.updateMe);
router.route("/deleteme").delete(authController.protect  , userController.deleteMe);

router.route("/contactmail").post(authController.protect  , userController.createContactMail);
router.route("/usermail").post(userController.createUserMail);


router.route("/singal/:id").get(authController.protect , userController.getSingalUser).patch(userController.updateUsers).delete(userController.deleteUsers);
router.route("/").get(userController.getAllUsers).post(userController.createUsers);


module.exports = router;