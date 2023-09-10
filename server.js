const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")
const dotenv = require("dotenv")
const auth = require("./auth")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoose = require("mongoose")
mongoose.connect(`mongodb://127.0.0.1:27017/taskmanagementapp`,{
                    useNewUrlparser:true,
                    useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connect to Mongo")
    })
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
    })

const router = express.Router()

const routes = require('./routes/user.routes')
app.use('/api', routes)

router.get('/', (req, res) => {
    res.json({ message: "Hello World!"})
})

app.use('/',router)

app.get("/free-endpoint", (req, res) => {
    res.json( { message: "You are free to access me anytime" } )
})

app.get( "/auth-endpoint", auth, (req, res) => {
    res.json( {message: "You are authorized to access me" } )
} )

app.listen(port, function() {
    console.log("Running on " + port)
})

module.exports = app
