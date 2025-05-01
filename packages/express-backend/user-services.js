import mongoose from "mongoose";
import userModel from "./user";
import blogModel from ".blog_post.js";
import "dotenv/config.js";

mongoose.set("debug", true);
// this is the code from assignment 4, I will adapt this into something that is usable for the project
mongoose
  .connect(process.env.MONGODB_URI, {
    // we will be using cluster 0, I will share the url later
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
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

function findUserByJob(job) {
  return userModel.find({ job: job });
}

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
  findUserByJob,
  getPosts,
  addPost
};
