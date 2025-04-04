import express from "express";
import cookieParser from "cookie-parser";
import {  signIn, signUp, signOut } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.use(cookieParser());

authRouter.post("/signup", signUp);

authRouter.post("/signin", signIn);

export default authRouter;

