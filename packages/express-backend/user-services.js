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

/*
USERS (get, add, findById, findByName, findByIdAndUpdate, findByIdAndDelete)
*/

function getUsers(name) {
  let promise;
  if (name === undefined) {
    promise = userModel.find();
  } else if (name) {
    promise = findUserByName(name);
  }
  return promise;
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByIdAndUpdate(id, updates) {
  return userModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });
}

function findUserByIdAndDelete(id) {
  return userModel.findByIdAndDelete(id);
}

/*
EMAILS (findUserByAndUpdate, doesUserExist, findUserBy)
*/

function findUserByEmailAndUpdate(email, updates) {
  const updatedUser = userModel.findOneAndUpdate(
    { email: email },
    { $set: updates },
    { new: true, runValidators: true }
  );
  return updatedUser;
}

function doesUserEmailExist(email) {
  if (userModel.find({ email: email }).length > 0) {
    return true;
  }
  return false;
}

function findUserByEmail(email) {
  return userModel.findOne({ email: email });
}

/*
POSTS (get, getUser, add, findByIdAndUpdate, findByIdAndDelete)
*/

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

function getUserPosts(userID) {
  let promise;
  if (userID == undefined) {
    console.log(
      "getPosts: UserID was not defined - returning all cities"
    );
    promise = blogModel.find();
  } else {
    promise = blogModel.find({ userID: userID });
  }
  return promise;
}

function addPost(post) {
  const postToAdd = new blogModel(post);
  const promise = postToAdd.save();
  return promise;
}

function findPostByIdAndUpdate(id, updates) {
  return blogModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });
}

function findPostByIdAndDelete(id) {
  return blogModel.findByIdAndDelete(id);
}

function updatePostInfoAfterProfileChange(id, updates) {
  const updateFields = {};
  if (updates.name) updateFields.username = updates.name;
  if (updates.profile_picture)
    updateFields.profile_picture = updates.profile_picture;
  if (updates.profile_picture_id)
    updateFields.profile_picture_id =
      updates.profile_picture_id;

  // If no relevant fields to update, just return a resolved promise immediately
  if (Object.keys(updateFields).length === 0) {
    return Promise.resolve(null);
  }

  return blogModel.updateMany(
    { userID: id },
    { $set: updateFields }
  );
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
  doesUserEmailExist,
  findUserByEmail,
  findUserByEmailAndUpdate,
  getPosts,
  getUserPosts,
  addPost,
  findPostByIdAndUpdate,
  findPostByIdAndDelete,
  updatePostInfoAfterProfileChange
};
