const path = require('path');
const express = require('express');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage: storage});

const router = express.Router();

const operationController = require('../controllers/operationController');

router.get('/', operationController.getHomePage );

router.get('/adduser',upload.single('profileImage'), operationController.getAddUser );

router.get('/edituser/:userId', operationController.getEditUser );

router.post('/adduser', operationController.postAddUser );

router.put('/edituser/:userId', operationController.putEditUser);

router.delete('/deleteuser/:userId', operationController.deleteUser);


module.exports = router;