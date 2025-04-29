import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema( // will add the ability to upload images later, will probably use cloudinary and just store url in schema
  {
    title: String,
    content: String,
    image: {
      type: String,
      required: false
    },
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
