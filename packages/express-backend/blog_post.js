//blog_post.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    state: { type: String, required: true },
    city: { type: String, required: true },
    image: {
      // cloudinary url
      type: String,
      required: false
    },
    imagePublicId: {
      type: String,
      required: false
    },
    createdAt: { type: Date, default: Date.now },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // see if can use userid to get username
    username: {
      type: String,
      required: true
    },
    profile_picture: {
      // use cloudinary url
      type: String
    },
    profile_picture_id: {
      type: String
    }
  },
  { collection: "blog_list" }
);

const BlogPost = mongoose.model("BlogPost", BlogSchema);

export default BlogPost;
