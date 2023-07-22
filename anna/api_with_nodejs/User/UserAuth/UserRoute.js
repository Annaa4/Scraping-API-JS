const express = require("express")
const router = express.Router()
const { register, login ,deleteUser, logout} = require("./Auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/deleteUser").delete(deleteUser);



module.exports = router