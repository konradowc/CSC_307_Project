//image.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  }
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
