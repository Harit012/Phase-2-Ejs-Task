// const { default: mongoose } = require("mongoose");

const userModel = require("../model/user");

let userdata=[]; 

(async function getData() {
  try {
    const array = await userModel.find(); 
    console.log("Array length:", array.length);
    userdata = array.slice(); 
    count ++;
    console.log("Count:", count);
    
    
  } catch (error) {
    console.error("Error:", error); // Handle any errors that occur during the asynchronous operation
  }
})()

exports.getHomePage =  (req, res, next) => {
  // const userdata = await userModel.find();
  console.log("Data:", userdata);
  
  res.render("homePage", {
    pageTitle: "Home Page",
    userData: userdata,
  });
};

exports.getAddUser = (req, res, next) => {
  res.render("homePage", {
    pageTitle: "Get Add User",
  });
};

exports.getEditUser = (req, res, next) => {
  res.render("homePage", {
    pageTitle: "Get Edit User",
  });
};

// adding User
exports.postAddUser = async (req, res, next) => {
  let path = req.file.path;
  path = path.slice(7, req.file.path.length);
  path = path.replace("\\",'/')
  
  
  const user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    profileImage: path,
  });
  // console.log(path);
  console.log(user);
  userdata.push(user);

  // res.status(200).send();
  res.redirect("/home");
  // return;

  // res.redirect("/home", {
  //   pageTitle: "Home Page",
  //   userData: userdata,
  // });
  // res.send("done")/
  // (await userdata).push(user);
  // res.render("homePage", { pageTitle: "home" , userData: userdata });
  // res.send("done Adding User");
};

exports.putEditUser = (req, res, next) => {
  res.redirect("/", { pageTitle: "put edit User" });
};

exports.deleteUser = (req, res, next) => {
  res.redirect("/");
};
