const express = require("express");


const router = express.Router();

const operationController = require("../controllers/operationController");

router.get("/home", operationController.getHomePage);

router.post("/adduser", operationController.postAddUser);

router.post("/searchUser", operationController.postSearchUser);

module.exports = router;
