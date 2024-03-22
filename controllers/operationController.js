const userModel = require("../model/user");
// const mongoose = require("mongoose");
exports.getHomePage = async (req, res, next) => {
  const userdata = await userModel.find().limit(10);
  const totalUsers = await userModel.find().count();
  const totalPages = totalUsers / 10;

  res.render("homePage", {
    totalPages: totalPages,
    pageTitle: "Home Page",
    userData: userdata,
  });
};

exports.getPageData = async (req, res, next) => {
  const page = req.body.page;

  const usersPerPage = 10;
  let userdata = await userModel
    .find()
    .skip(page * usersPerPage)
    .limit(usersPerPage);

  res.send(userdata);
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
  var search = req.body.search;
  console.log(search);
  
  if (req.body.search == null || req.body.search == undefined) {
    // res.send(req.body.previousHtml);
  } else {
    try {
      const userdata = await userModel.find({
        $or: [
          { username: { $regex: req.body.search, $options: "i" } },
          { email: { $regex: req.body.search, $options: "i" } },
          // { _id:{ $eq:search} },
          // { phone: { $convert: { input: numsearch, to: "int32" } } },
        ],
      });
      if (userdata == []) {
        res.send({ data: "no Data found" });
      } else {
        console.log(userdata);
        res.send(userdata);
      }
    } catch (err) {
      console.log(err);
      res.send({ data: "no Data found", error: err });
    }
  }
};

exports.putEditUser = async (req, res, next) => {
  const oldpath = req.body.image;
  if (req.file) {
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
  let id = req.body.id;
  console.log(id);
  let userdata = await userModel.findByIdAndDelete({ _id: id });

  res.send(userdata);
};
