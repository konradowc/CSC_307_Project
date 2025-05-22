//blog_post.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    city: { type: String, required: true },
    /*
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
      }
    ],
    */

    /* temp */
    image: {
      // make this so that it is simply a url which will be accessed by cloudinary
      type: String,
      required: false
    },
    imagePublicId: {
      type: String,
      required: false
    },
    /* temp */

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
