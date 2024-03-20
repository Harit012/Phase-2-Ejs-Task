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
    // console.log(user);
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
  console.log(`Server side recived data :- ` + req);
  console.log(JSON.stringify(req.body));
  console.log(req.body.id);
  

  let editedEntry = await userModel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  // updatedEntry = await userModel.findOne({ _id: req.body._id });

  res.send(editedEntry);
};

exports.deleteUser = async (req, res, next) => {
  let email = req.body.email;
  // console.log(email);
  let id = req.body._id;
  console.log(id);
  let userdata = await userModel.deleteOne({ email: email });

  res.send(userdata);
};
