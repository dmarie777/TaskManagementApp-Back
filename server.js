// Import the required pre-install packages
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")
// For a future cookieSession
const cookieSession = require("cookie-session")
// Add .env files
const dotenv = require("dotenv")
dotenv.config()

const app = express()

// Port number
const port = process.env.PORT || 3001

// Set express with the necessary parameter
app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Mongoose connection
const mongoose = require("mongoose")
mongoose.connect(`mongodb://127.0.0.1:27017/taskmanagementapp`,{
                    useNewUrlparser:true,
                    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connect to Mongo")
    })
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
    })

// Router
const router = express.Router()

// Routes
const routes = require('./routes/user.routes')
app.use('/api', routes)

// CRUD
router.get('/', (req, res) => {
    res.json({message: "Hello World!"})
})

app.use('/',router)

// Express start
app.listen(port, function() {
    console.log("Running on " + port)
})

module.exports = app
