//user.js
import mongoose from "mongoose";
// need to dictate whether user or admin
const UserSchema = new mongoose.Schema( // this is not the final version, will need to assess and improve
  {
    name: {
      //usename
      type: String,
      required: false, // set to false so that way can patch in during steps
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: false,
      trim: true
    },
    city: {
      type: String,
      required: false,
      trim: true
    },
    password: {
      // this is where the hashed password will be stored
      type: String,
      required: true,
      trim: true
    }, // may add a progress step counter
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost"
      }
    ]
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
