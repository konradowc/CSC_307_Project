import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( // this will need to be changed to have all the stuff that we need
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error(
            "Invalid job, must be at least 2 characters."
          );
      }
    }
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
