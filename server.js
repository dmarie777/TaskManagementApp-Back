import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";
import auth from "./auth.js";
import routes from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";


dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const router = express.Router()

app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({ message: "Hello World!"})
})

app.get("/free-endpoint", (req, res) => {
    res.json( { message: "You are free to access me anytime" } )
})

app.get( "/auth-endpoint", auth, (req, res) => {
    res.json( {message: "You are authorized to access me" } )
} )

app.listen(port, async() => {
    await connectToDatabase();
    console.log("The server is running on port " + port)
})

export default app
