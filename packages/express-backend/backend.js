// backend.js
import express from "express";
import multer from "multer";
import { storage } from "./cloudinary.js";
import db from "./user-services.js";

const app = express();
const port = 8000;

const upload = multer({ storage });

app.use(express.json());

app.get("/", (req, res) => {
  // will need to set up all the gets to get the proper stuff according to the rest model
  res.send("Hello World!");
});

// this uses multer to post images to cloudinary directly
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file)
    return res.status(400).send("No file uploaded.");
  res.status(200).json({
    imageUrl: req.file.path, // Cloudinary image URL
    publicId: req.file.filename // Can be used to delete the image
  });
});

/*
BLOG POSTS
*/

// GETs all the blog posts given a certain city name
// returns 200 if success, 400 if undefined city, and 401 if failure
app.get("/api/posts", (req, res) => {
  const city = req.query.city;

  if (city == undefined) {
    // no city given, what should be done?
    console.log("GET api/posts: no city defined");
    res.status(400).send(undefined);
    /*db.getPosts()
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((error) => {
        console.log("GET api/posts: " + error);
        res.status(400).send(undefined);
      });*/
  } else {
    db.getPosts(city)
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((error) => {
        console.log("GET api/posts: " + error);
        res.status(404).send(undefined);
      });
  }
});

// POSTs a blog post passed in as a JSON object
// returns 201 if success or 400 if failure
app.post("/api/posts", (req, res) => {
  const postToAdd = req.body;

  db.addPost(postToAdd)
    .then((post) => {
      res.status(201).send(post);
    })
    .catch((error) => {
      console.log("POST api/posts: " + error);
      res.status(400).send(undefined);
    });
});

/*
USERS
*/

// POSTs a user passed in as a JSON object
// returns 201 if success or 400 if failure
app.post("/api/auth/signup", (req, res) => {
  const userToAdd = req.body;

  db.addUser(userToAdd)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.log("POST api/auth/signup: " + error);
      res.status(400).send(undefined);
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
