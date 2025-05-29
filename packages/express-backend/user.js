//user.js
import mongoose from "mongoose";

// currently have no admin users
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
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
    profile_picture: {
      // use cloudinary url
      type: String
    },
    profile_picture_id: {
      type: String
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
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
