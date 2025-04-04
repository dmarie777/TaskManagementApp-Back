import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import logger from "morgan";
import authRouter from './routes/auth.routes.js';
import connectToDatabase from "./database/mongodb.js";

const app = express()
const port = process.env.PORT || 3001

app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/api', authRouter)

app.get('/', (req, res) => {
    res.json({ message: "Hello World!"})
})


app.listen(port, async() => {
    await connectToDatabase();
    console.log("The server is running on port " + port)
})

export default app
