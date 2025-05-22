//blog_post.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    city: { type: String, required: true },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
      }
    ],
    createdAt: { type: Date, default: Date.now },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { collection: "blog_list" }
);

const BlogPost = mongoose.model("BlogPost", BlogSchema);

export default BlogPost;
