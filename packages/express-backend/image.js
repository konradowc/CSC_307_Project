//image.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  }
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
