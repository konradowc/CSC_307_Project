import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from "dotenv";
import blogModel from "./blog_post.js";

mongoose.set("debug", true);
dotenv.config();

const mongoURL = process.env.MONGODB_URI;

await mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));

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

//function postImage(imagefile) {

//}

function getPosts(city) {
  let promise;
  if (city == undefined) {
    console.log(
      "getPosts: City was not defined - returning all cities"
    );
    promise = blogModel.find();
  } else {
    promise = blogModel.find({ city: city });
  }
  return promise;
}

function addPost(post) {
  const postToAdd = new blogModel(post);
  const promise = postToAdd.save();
  return promise;
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  //postImage,
  getPosts,
  addPost
};
