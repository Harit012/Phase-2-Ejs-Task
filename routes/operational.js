const express = require("express");


const router = express.Router();

const operationController = require("../controllers/operationController");

router.get("/home", operationController.getHomePage);

router.post("/adduser", operationController.postAddUser);

router.post("/searchUser", operationController.postSearchUser);

router.put("/editUser", operationController.putEditUser);

router.delete("/deleteUser",operationController.deleteUser);

module.exports = router;
