import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from "dotenv";
//import multer from "multer";

mongoose.set("debug", true);
dotenv.config();

const mongoURL = process.env.MONGODB_URI;

const conn = await mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));

const db = conn.connection;

/*let gfsBucket;
db.once("open", () => {
  gfsBucket = new GridFSBucket(db.db, {
    bucketName: "uploads"
  });
  console.log("✅ GridFS ready");
});*/

function getUsers(name) {
  let promise;
  if (name === undefined) {
    promise = userModel.find();
  } else if (name) {
    promise = findUserByName(name);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function postImage(imagefile) {
  /* return new Promise((resolve, reject) => {
    const uploadStream = gfsBucket.openUploadStream(
      imagefile.originalname,
      {
        contentType: imagefile.mimetype
      }
    );

    uploadStream.end(imagefile.buffer);

    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
  });*/
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  postImage
};
