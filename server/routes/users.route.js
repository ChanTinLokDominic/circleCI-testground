const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");

router
    .route("/user")
    .post(usersController.adduser)
    .patch(usersController.updateUsernameAndPassword)
    .get(usersController.getAllusers)

router.patch("/removeUser", usersController.deleteUser)

router.post("/userByUsername", usersController.getUserByUsername)


router
    .route("/updateFavourite")
    .post(usersController.addUserFavourite)
    .patch(usersController.removeUserFavourite)

module.exports = router;