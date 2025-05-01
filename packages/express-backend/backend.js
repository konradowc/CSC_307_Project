// backend.js
import express from "express";
import userServices from "./user-services.js";
import multer from "multer";

const app = express();
const port = 8000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

app.get("/", (req, res) => {
  // will need to set up all the gets to get the proper stuff according to the rest model
  res.send("Hello World!");
});

// will add a post method to post images into the repository
/*app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileMeta = await userServices.postImage(req.file);
    res.json({
      message: "✅ File uploaded",
      fileId: fileMeta._id,
      filename: fileMeta.filename
    });
  } catch (error) {
    console.error("GridFS upload error:", error);
    res.status(500).send("Failed to upload file");
  }
});*/

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
