import mongoose from "mongoose";
import userModel from "./user";


// use process.env.Mongoose or something like that


mongoose.set("debug", true);
// this is the code from assignment 4, I will adapt this into something that is usable for the project
mongoose
  .connect("mongodb://localhost:27017/users", { // reuse cluster 0 for this, will need to figure out how to protect the secrets, use .env variables
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};