const { default: mongoose } = require("mongoose");

const userModel = require("../model/user");

// async function getData() {
//   return await userModel.find();
// }
// var userdata;
// var users = getData().then(
//   (data)=>{
//     userdata = data ;
//     console.log(userdata);
//   }
// ) ;
// console.log(user);

exports.getHomePage = async (req, res, next,) => {
  const userdata = await userModel.find();

  res.render("homePage", {
    pageTitle: "Home Page",
    userData: userdata,
  });
  // console.log(userdata);
};

exports.getAddUser = (req, res, next) => {
  res.render("homePage", {
    pageTitle: "Get Add User",
  });
};

exports.getEditUser = (req, res, next) => {
  res.render("homePage", { 
    pageTitle: "Get Edit User" 
  });
};

// adding User
exports.postAddUser = async (req, res, next) => {
  const user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    profileImage: req.file.path,
  });
  console.log(user);
  res.redirect("/",{
    pageTitle: "homePage",
  });
  // (await userdata).push(user);
  // res.render("homePage", { pageTitle: "home" , userData: userdata });
  // res.send("done Adding User");
};

exports.putEditUser = (req, res, next) => {
  res.redirect("/", { pageTitle: "put edit User" });
};

exports.deleteUser = (req,res,next)=>{

  res.redirect("/");
}