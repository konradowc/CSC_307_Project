// backend.js
import express from "express";
import multer from "multer";
import { storage, deleteImage } from "./cloudinary.js";
import db from "./user-services.js";
import cors from "cors";
import { registerUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

// need to determine which routes to protect with authenticateUser, will probably talk with the team and also use own discretion

app.get("/", (req, res) => {
  // will need to set up all the gets to get the proper stuff according to the rest model
  res.send("Hello World!");
});

// this uses multer to post images to cloudinary directly
app.post(
  "/upload",
  authenticateUser,
  upload.single("file"),
  async (req, res) => {
    if (!req.file)
      return res.status(400).send("No file uploaded.");
    res.status(200).json({
      imageUrl: req.file.path, // Cloudinary image URL
      publicId: req.file.filename // Can be used to delete the image
    });
  }
);

// this deletes images from cloudinary
// will need to encode publicId when inserting into endpoint
app.delete(
  "/upload/:publicId",
  authenticateUser,
  async (req, res) => {
    const publicId = req.params.publicId;

    try {
      const result = await deleteImage(publicId);
      res
        .status(200)
        .json({ message: "Image deleted", result });
    } catch (err) {
      res.status(500).json({
        error: "Failed to delete image",
        details: err
      });
    }
  }
);

/*
BLOG POSTS
*/

// GETs all the blog posts given a certain city name
// returns 200 if success, 400 if undefined city, and 401 if failure
app.get("/api/posts", (req, res) => {
  const city = req.query.city;
  db.getPosts(city)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });

  // const city = req.query.city; - temporarily not filtering by city

  // if (city == undefined) {
  //   // no city given, what should be done?
  //   console.log("GET api/posts: no city defined");
  //   res.status(400).send(undefined);
  //   /*db.getPosts()
  //     .then((posts) => {
  //       res.status(200).send(posts);
  //     })
  //     .catch((error) => {
  //       console.log("GET api/posts: " + error);
  //       res.status(400).send(undefined);
  //     });*/
  // } else {
  //   db.getPosts(city)
  //     .then((posts) => {
  //       res.status(200).send(posts);
  //     })
  //     .catch((error) => {
  //       console.log("GET api/posts: " + error);
  //       res.status(404).send(undefined);
  //     });
  // }
});

// POSTs a blog post passed in as a JSON object
// returns 201 if success or 400 if failure
app.post("/api/posts", authenticateUser, (req, res) => {
  const postToAdd = req.body;

  //const title = postToAdd.title;
  //const content = postToAdd.content;
  const city = postToAdd.city;
  //const image = postToAdd.image;
  //const imagePublicId = postToAdd.imagePublicId;
  //const createdAt = postToAdd.createdAt;
  //const userID = postToAdd.userID;

  // validation

  if (!validCity(city)) {
    console.log("POST api/posts: invalid city");
    res.status(400).send(undefined);
  }

  // posting

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

// GETs a user (including profile info and their posts)
// returns 200 if success, 401 if failure
app.get("/api/users/:id", authenticateUser, (req, res) => {
  const id = req.params.id;

  db.findUserById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log("GET api/users/:id: " + error);
      res.status(400).send(undefined);
    });
});

// POSTs a user passed in as a JSON object
// returns 201 if success or 400 if failure
app.post("/api/auth/signup", (req, res) => {
  const userToAdd = req.body;

  const name = userToAdd.name;
  const city = userToAdd.city;
  const posts = userToAdd.posts;

  // validation

  if (!validName(name)) {
    console.log("POST api/auth/signup: invalid name");
    res.status(400).send(undefined);
  }
  if (!validCity(city)) {
    console.log("POST api/auth/signup: invalid city");
    res.status(400).send(undefined);
  }
  if (!Array.isArray(posts) || posts.length !== 0) {
    // should be an array of length 0
    console.log("POST api/auth/signup: bad posts");
    res.status(400).send(undefined);
  }

  // posting

  db.addUser(userToAdd)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.log("POST api/auth/signup: " + error);
      res.status(400).send(undefined);
    });
});

// PATCHs a user's profile settings
// returns 200 if success, 400 if failure, or 403 if forbidden
app.patch(
  "/api/users/:id/settings",
  authenticateUser,
  (req, res) => {
    const id = req.params.id;

    const fieldsToUpdate = req.body;

    const name = fieldsToUpdate.name;
    const city = fieldsToUpdate.city;
    const posts = fieldsToUpdate.posts;

    // validation

    if (name !== undefined && !validName(name)) {
      console.log("PATCH api/users/:id/settings: invalid name");
      res.status(400).send(undefined);
    }
    if (city !== undefined && !validCity(city)) {
      console.log("PATCH api/users/:id/settings: invalid city");
      res.status(400).send(undefined);
    }
    if (posts !== undefined) {
      // trying to update posts (not allowed here)
      console.log(
        "PATCH api/users/:id/settings: attempting to update blog posts in settings"
      );
      res.status(403).send(undefined);
    }

    // updating

    db.findUserByIdAndUpdate(id, fieldsToUpdate)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        console.log("PATCH api/users/:id/settings: " + error);
      });
  }
);

// will probably remove these two
app.post("/signup", registerUser); // this is for signing in

app.post("/login", registerUser); // this is for logging in

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// helper functions

function validName(name) {
  return /^[a-zA-z]+$/.test(name);
}

function validCity(city) {
  return city !== ""; // list of cities in future?
}

// curl -X POST http://localhost:8000/api/auth/signup -H "Content-Type: application/json" -d "{\"name\": \"John\", \"city\": \"San Luis Obispo\", \"posts\": []}"
