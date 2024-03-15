const userModel = require("../model/user");

exports.getHomePage = async (req, res, next) => {
  const userdata = await userModel.find();

  res.render("homePage", {
    pageTitle: "Home Page",
    userData: userdata,
  });
};

// adding User
exports.postAddUser = async (req, res, next) => {
  let path = req.file.path;
  path = path.slice(7, req.file.path.length);
  path = path.replace("\\",'/')
  console.log("post route called");
  
  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: path,
    });
    console.log(user);
    res.type("json");
    res.send( user );
  } 
  catch (err) {
    console.log(err);
    console.log("Error: in adding preson `controllers/operationController.js`" );
  }
};
