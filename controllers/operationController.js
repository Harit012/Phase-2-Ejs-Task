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
  path = path.replace("\\", "/");

  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: path,
    });
    res.type("json");
    res.send(user);
  } catch (err) {
    console.log(err);
    console.log("Error: in adding preson `controllers/operationController.js`");
  }
};

// finding User
exports.postSearchUser = async (req, res, next) => {
  if (req.body.search == "") {
    let userdata = await userModel.find();
    res.send(userdata);
  } else {
    const search = new RegExp(`${Number(req.body.search)}`);
    try {
      const userdata = await userModel.find({
        $or: [
          { username: {$regex: req.body.search, $options: "i"} },
          { email:  {$regex: req.body.search, $options: "i"} },
        ],
      });
      if (userdata == []) {
        res.send({ data: "no Data found" });
      } else {
        res.send(userdata);
      }
    } catch (err) {
      console.log(err);
      res.send({ data: "no Data found" });
    }
  }
};

exports.putEditUser = async (req, res, next) => {
  const oldpath= req.body.image;
  if(req.file){
    var path = req.file.path;
    path = path.slice(7, req.file.path.length);
    path = path.replace("\\", "/");
  }
  
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        profileImage: path?path:oldpath,
      },
    },
    { new: true }
  );

  res.send(updatedUser);
};

exports.deleteUser = async (req, res, next) => {
  let id = req.body.id;
  console.log(id);
  let userdata = await userModel.findByIdAndDelete({ _id: id });

  res.send(userdata);
};
