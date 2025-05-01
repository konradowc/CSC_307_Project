import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: {
      // this is simply going to be a reference to the image
      // in order to actually serve the image, we will need to make it so that the image is first posted and then the blog is posted
      // so that the blog can actually grab the image which will be stored in a separate database
      // make it so that the image is stored in mongo, use gridfs
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
