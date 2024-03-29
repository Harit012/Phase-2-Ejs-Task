const express = require("express");
const path = require("path");
const { urlencoded } = require("body-parser");
const multer = require("multer");
const mongoose = require ("mongoose");
const cors = require("cors");

try{
  mongoose.connect("mongodb://localhost:27017/EjsTask");
  console.log("mongodb connected");
  
}
catch(err){
  console.log(err);
}
  

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    console.log(req.file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
const operationalRoutes = require("./routes/operational");
const errorHandler = require("./controllers/errorController");

app.use(upload.single("userProfile"), operationalRoutes);

app.use("/", errorHandler.getError);

app.listen(3050, () => {
  console.log(`app is live on port 3050`);
});
