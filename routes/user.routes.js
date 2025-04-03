import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.use(cookieParser())


router.post("/signup", async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const userSave = await user.save()
        res.status(200).json({ message: "Succsessfull" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post("/login", async function (request, response) {
  try {
    const user = await User.findOne( { email: request.body.email } )
    console.log(request.body)
    if (user) {
        bcrypt
          .compare(request.body.password, user.password)
          .then((passwordCheck) => {
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
            console.log("Login Successful")
          })
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
    } else {
      console.log('User not found')
    }
  } catch (err) {
    response.status(404).send({
      message: "Email not found",
      err,
    });
  }
});

export default router;

