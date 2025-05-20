//user.js
import mongoose from "mongoose";
// need to dictate whether user or admin
const UserSchema = new mongoose.Schema( // this is not the final version, will need to assess and improve
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    city: {
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
