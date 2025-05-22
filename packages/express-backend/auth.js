import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import us from "./user-services.js";
import dotenv from "dotenv";

dotenv.config();

// for these functions, the username is the email
// maybe ask about the steps and stuff
export function registerUser(req, res) {
  const { email, pwd } = req.body; // from form

  if (!email || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (us.doesUserEmailExist(email)) {
    res.status(409).send("email already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(email).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token: token });
          us.addUser({
            email: email,
            password: hashedPassword
          });
        });
      });
  }
}

function generateAccessToken(email) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email: email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          req.user = decoded;
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export async function loginUser(req, res) {
  const { email, pwd } = req.body; // from form
  const retrievedUser = await us.findUserByEmail(email);

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
    //console.error("could not retrieve user");
  } else {
    //console.log(retrievedUser.password);
    //console.log(pwd);
    bcrypt
      .compare(pwd, retrievedUser.password)
      .then((matched) => {
        if (matched) {
          generateAccessToken(email).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized"); // will need to change these to be more vague
          //console.error("bad pass");
        }
      })
      .catch(() => {
        //console.error("erroring for some reason: ", error);
        res.status(401).send("Unauthorized");
      });
  }
}
