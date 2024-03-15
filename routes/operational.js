const express = require("express");


const router = express.Router();

const operationController = require("../controllers/operationController");

router.get("/home", operationController.getHomePage);

router.post("/adduser", operationController.postAddUser);

module.exports = router;
