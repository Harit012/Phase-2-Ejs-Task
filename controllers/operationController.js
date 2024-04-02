const { response } = require("express");
const userModel = require("../model/user");
const fs = require("fs");
var pathm = require("path");

var usersPerPage = 5;
// const mongoose = require("mongoose");
exports.getHomePage = async (req, res, next) => {
  const userdata = await userModel.find().limit(usersPerPage);

  res.render("homePage", {
    pageTitle: "Home Page",
    userData: userdata,
  });
};

exports.getPageData = async (req, res, next) => {
  console.log(`Server side pagination called for page no :- ${req.body.page}`);
  console.log(`The ip is ${req.connection.remoteaddress}`);

  const page = Number(req.body.page);
  let Pages = Math.ceil((await userModel.countDocuments()) / usersPerPage);
  if (page < Pages) {
    let userdata = await userModel
      .find()
      .skip(page * usersPerPage)
      .limit(usersPerPage);
    res.send({ userdata, Pages });
  } else res.send({ outOfRange: true });
};
// adding User
exports.postAddUser = async (req, res, next) => {
  let path = req.file.path;
  path = path.slice(7, req.file.path.length);
  path = path.replace("\\", "/");

  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: path,
    });
    res.send(user);
  } catch (err) {
    console.log("Error: in adding preson `controllers/operationController.js`");
    res.send({ error: err, email: req.body.email });
  }
};

// finding User
exports.postSearchUser = async (req, res, next) => {
  let isNum = isNaN(req.body.search);
  let search = isNum ? 0 : Number(req.body.search);

  var page = req.body.page ? Number(req.body.page) : 0;

  const Page = Math.ceil(
    (await userModel
      .find({
        $or: [
          { username: { $regex: req.body.search, $options: "i" } },
          { email: { $regex: req.body.search, $options: "i" } },
          { phone: { $eq: search } },
        ],
      })
      .count()) / usersPerPage
  );

  try {
    if (page < Page) {
      const userdata = await userModel
        .find({
          $or: [
            { username: { $regex: req.body.search, $options: "i" } },
            { email: { $regex: req.body.search, $options: "i" } },
            { phone: { $eq: search } },
          ],
        })
        .skip(page * usersPerPage)
        .limit(usersPerPage);

      if (userdata == []) {
        res.send({ outOfData: "no Data found" });
      } else {
        res.send({ userdata: userdata, Page: Page });
      }
    } else {
      if (Page === 0) {
        res.send({ userNotFound: true });
      } else {
        res.send({ outOfRange: true });
      }
    }
  } catch (err) {
    console.log(err);
    res.send({ data: "no Data found", error: err });
  }
};

exports.putEditUser = async (req, res, next) => {
  const oldpath = req.body.image;
  if (req.file) {
    fs.unlink(pathm.join(__dirname, `../public/${oldpath}`))
    var path = req.file.path;
    path = path.slice(7, req.file.path.length);
    path = path.replace("\\", "/");
  }
  try {
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          profileImage: path ? path : oldpath,
        },
      },
      { new: true }
    );

    res.send(updatedUser);
  } catch (err) {
    console.log(
      "Error: in updating preson `controllers/operationController.js`"
    );
    res.send({ error: err, email: req.body.email });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let id = req.body.id;
    let imgpath = req.body.path;
    fs.unlink(pathm.join(__dirname, `../public/${imgpath}`))
    let userdata = await userModel.findByIdAndDelete({ _id: id });
    res.send(userdata);
  } catch (e) {
    console.log(`Error in deleting :--  ${e}`);
    res.send({ error: e, message: "Error in deleting" });
  }
};
