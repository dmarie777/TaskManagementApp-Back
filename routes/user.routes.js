import express from "express";
import auth from '../middleware/auth.middleware.js';
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = express.Router();

userRouter.get("/", getUsers)
userRouter.get("/:id", auth, getUser);

export default userRouter;

