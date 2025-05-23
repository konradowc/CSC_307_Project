// backend.js
import express from "express";
import multer from "multer";
import { storage, deleteImage } from "./cloudinary.js";
import db from "./user-services.js";
import cors from "cors";
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./auth.js";

const app = express();
const port = 8000;

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

// need to determine which routes to protect with authenticateUser, will probably talk with the team and also use own discretion

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
IMAGES
*/

// POSTs a single image to cloudinary
// returns 200 if success, 400 if failure

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

// DELETEs a single image from cloudinary
// returns 200 if success, 500 if failure

app.delete(
  "/upload/:publicId",
  //authenticateUser,
  async (req, res) => {
    // will need to encode publicId when inserting into endpoint
    dbRequest(
      deleteImage,
      [req.params.publicId],
      res,
      genErrHeader(req),
      200,
      500
    );
  }
);

/*
BLOG POSTS
*/

// GETs all the blog posts given a certain city name, or a certain userID
// returns 200 if success, 401 if failure

app.get("/api/posts", (req, res) => {
  if (req.query.city !== undefined) {
    dbRequest(
      db.getPosts,
      [req.query.city],
      res,
      genErrHeader(req),
      200,
      401
    );
  } else if (req.query.userID !== undefined) {
    dbRequest(
      db.getUserPosts,
      [req.query.userID],
      res,
      genErrHeader(req),
      200,
      401
    );
  } else {
    console.log(genErrHeader(req) + "no query passed in");
    res.status(401).send(undefined);
  }
});

// POSTs a blog post passed in as a JSON object
// returns 201 if success or 400 if failure
app.post("/api/posts", authenticateUser, (req, res) => {
  const postToAdd = req.body;
  const fieldsToValidate = [
    // will need to ask why we are validating the city
    ["city", postToAdd.city]
    //["title", postToAdd.title],
    //["content", postToAdd.content],
    //["image", postToAdd.content],
    //["imagePublicId", postToAdd.imagePublicId],
    //["createdAt", postToAdd.createdAt],
    //["userID", postToAdd.userID]
  ];
  const errheader = genErrHeader(req);

  if (valid(fieldsToValidate, false, res, errheader)) {
    dbRequest(
      db.addPost,
      [postToAdd],
      res,
      errheader,
      201,
      400
    );
  }
});

// PATCHs a blog post (edits it)
// returns 200 if success, 400 if failure

app.patch(
  "/api/posts/:id",
  //authenticateUser,
  (req, res) => {
    const postFieldsToUpdate = req.body;
    const fieldsToValidate = [
      ["city", postFieldsToUpdate.city]
      //["title", postFieldsToUpdate.title],
      //["content", postFieldsToUpdate.content],
      //["image", postFieldsToUpdate.content],
      //["imagePublicId", postFieldsToUpdate.imagePublicId],
      //["createdAt", postFieldsToUpdate.createdAt],
      //["userID", postFieldsToUpdate.userID]
    ];
    const errheader = genErrHeader(req);

    // TO-DO: update old images

    if (valid(fieldsToValidate, true, res, errheader)) {
      dbRequest(
        db.findPostByIdAndUpdate,
        [req.params.id, postFieldsToUpdate],
        res,
        errheader,
        200,
        400
      );
    }
  }
);

// DELETEs a blog post from id
// returns 200 if success or 400 if failure

app.delete(
  "/api/posts/:id",
  //authenticateUser,
  (req, res) => {
    dbRequest(
      db.findPostByIdAndDelete,
      [req.params.id],
      res,
      genErrHeader(req),
      200,
      400
    );
  }
);

/*
USERS
*/

// GETs a user (including profile info and their posts)
// returns 200 if success, 401 if failure

app.get(
  "/api/users/:id", //
  // authenticateUser,
  (req, res) => {
    dbRequest(
      db.findUserById,
      [req.params.id],
      res,
      genErrHeader(req),
      200,
      401
    );
  }
);

// POSTs a user passed in as a JSON object
// returns 201 if success or 400 if failure
// will probably remove this
app.post("/api/auth/signup", (req, res) => {
  const userToAdd = req.body;
  const fieldsToValidate = [
    ["name", userToAdd.name],
    ["city", userToAdd.city],
    ["emptyposts", userToAdd.posts] // posts needs to be an empty array
  ];
  const errheader = genErrHeader(req);

  if (valid(fieldsToValidate, false, res, errheader)) {
    dbRequest(
      db.addUser,
      [userToAdd],
      res,
      errheader,
      201,
      400
    );
  }
});

// PATCHs a user's profile settings
// returns 200 if success, 400 if failure

app.patch(
  "/api/users/:id/settings",
  //authenticateUser,
  (req, res) => {
    const userFieldsToUpdate = req.body;
    const fieldsToValidate = [
      ["name", userFieldsToUpdate.name],
      ["city", userFieldsToUpdate.city],
      ["undefinedposts", userFieldsToUpdate.posts] // posts should be undefined
    ];
    const errheader = genErrHeader(req);

    if (valid(fieldsToValidate, true, res, errheader)) {
      dbRequest(
        db.findUserByIdAndUpdate,
        [req.params.id, userFieldsToUpdate],
        res,
        genErrHeader(req),
        200,
        400
      );
    }
  }
);

// DELETEs a user from id
// returns 200 if success or 400 if failure

app.delete(
  "/api/users/:id",
  //authenticateUser,
  (req, res) => {
    dbRequest(
      db.findUserByIdAndDelete,
      [req.params.id],
      res,
      genErrHeader(req),
      200,
      400
    );
  }
);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// helper functions

// database request

function dbRequest(
  func,
  params,
  res,
  errheader,
  successCode,
  failureCode
) {
  func(...params)
    .then((result) => {
      res.status(successCode).send(result);
    })
    .catch((error) => {
      console.log(errheader + error);
      res.status(failureCode).send(undefined);
    });
}

// validation

function valid(fields, OKifundefined, res, errheader) {
  let isValid = true;
  fields.forEach((field) => {
    // for each field, call the relevant validator
    console.log("checking: " + field[0] + " " + field[1]);
    if (field[1] !== undefined) {
      if (!validators["valid" + field[0]](field[1])) {
        console.log(errheader + "invalid" + field[0]);
        isValid = false;
      }
    } else {
      if (!OKifundefined) {
        console.log(errheader + "undefined" + field[0]);
        isValid = false;
      }
    }
  });
  if (!isValid) res.status(400).send(undefined);
  return isValid;
}

const validators = {
  validname,
  validcity,
  validemptyposts,
  validundefinedposts
};

function validname(name) {
  return /^[a-zA-z]+$/.test(name);
}

function validcity(city) {
  return city !== ""; // list of cities in future?
}

function validemptyposts(posts) {
  return !Array.isArray(posts) || posts.length !== 0;
}

function validundefinedposts(posts) {
  return posts === undefined; // posts should be undefined
}

// generate error header

function genErrHeader(req) {
  return req.method + " " + req.route.path + ": ";
}

/*
manual stuff
*/

// will probably add the posts and stuff for the function
app.post("/signup", registerUser);
app.post("/signin", loginUser);

app.patch("/users", authenticateUser, (req, res) => {
  const { email } = req.user;
  const updates = req.body;

  db.findUserByEmailAndUpdate(email, updates)
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(404)
          .json({ error: "User not found" });
      }
      console.log("Updated successfully:", updatedUser);
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
      });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/users", authenticateUser, (req, res) => {
  const { email } = req.user;

  db.findUserByEmail(email)
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// this does nothing right now
/*app.post("/posts", authenticateUser, (req, res) => {
  const { email } = req.user;
  db.findUserByEmail(email).then().catch(); // make this so that after finding the user, it takes the users id and posts the blog post maybe
});*/
