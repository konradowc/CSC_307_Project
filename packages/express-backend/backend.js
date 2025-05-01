// backend.js
import express from "express";
//import userServices from "./user-services.js";
//import multer from "multer";
import db from "./user-services.js";

const app = express();
const port = 8000;

//const storage = multer.memoryStorage();
//const upload = multer({ storage });

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
// GETs all the blog posts given a certain city name, if none is provided all posts are returned
app.get("/api/posts", (req, res) => {
  console.log("GET /posts");

  const city = req.query.city;

  let posts;
  if (city == undefined) {
    // no city given, what should be done?
    // for now, just get all posts:
    db.getPosts()
      .then((ret) => {
        posts = ret;
      })
      .catch((error) => {
        console.log("GET api/posts: " + error);
      });
  } else {
    db.getPosts(city)
      .then((ret) => {
        posts = ret;
      })
      .catch((error) => {
        console.log("GET api/posts: " + error);
      });
  }
  res.send(posts);
});

// POSTs a blog post passed in as a JSON object in req, returns a positive status of 201 and sends the post back
app.post("/api/posts", (req, res) => {
  console.log("POST /posts");

  const postToAdd = req.body;

  let post;
  db.addPost(postToAdd)
    .then((res) => {
      post = res;
    })
    .catch((error) => {
      console.log("POST api/posts: " + error);
    });

  res.status(201).send(post);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
