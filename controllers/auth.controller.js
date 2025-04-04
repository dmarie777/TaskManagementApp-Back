import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN  } from "../config/env.js";

export const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, email, password } = req.body;
        const storedUser = await User.findOne({ email });

        if(storedUser) {
            const error = new Error('User already exists!');
            error.statusCode = 400;
            throw error; 
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash( password, salt);

        const newUser = await User.create(
            [{ 
                username,
                email,
                password: hashedPassword
            } ],
            { session }
        );
        const token = jwt.sign( {userId: newUser[0]._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: 'User created succsessfully',
            data: { token, user: newUser[0] }
        })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const signIn = async (request, response) => {
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
                message: 'User signed in succesfully',
                email: user.email,
                token,
              });
            })
            .catch((error) => {
              response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            });
      } else {
          const error = new Error('user not found');
          error.statusCode = 404;
          throw error;
      }
    } catch (err) {
      response.status(404).send({
        message: "Email not found",
        err,
      });
    }
  }

  export const signOut = async (req, res, next) => {}