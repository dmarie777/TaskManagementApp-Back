// Import the required pre-install packages
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")
// Add .env files
const dotenv = require("dotenv") // Necessary for the ussage of .env file which is ignored in .gitignore because of privacy
dotenv.config() // Without this line dotenv will NOT work

const app = express()

// Port number
const port = process.env.PORT || 3001

// Set express with the necessary parameter
app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Mongoose connection
const mongoose = require("mongoose") // Mongoose is the ORM( search it ) to write javascript which actually communicate with a database without SQL or another database language
mongoose.connect(`mongodb://127.0.0.1:27017/taskmanagementapp`,{
                    useNewUrlparser:true,
                    useUnifiedTopology: true
}) // Well we need to connect our server to a mongodb server in this case it's a local mongodb server sometimes this link non-locally is similar like mongodb+srv://
   // The other confiurations are usuallly used to set up a initial configuration of mongodb I usually put that just in case but they are not strictly useful
    .then(() => {
        console.log("Successfully connect to Mongo")
    }) // This run just in case our connection to the server was successfully
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
    }) // Try to get this error just to see what happen but in simple words tells you that mongoose.connect didn't work

// Router
const router = express.Router()

// Routes
const routes = require('./routes/user.routes') // This is not the best practice but works in case of just manage the user I create it this way because of
// usefulness to know it's just for users ( this probably change in the future)
app.use('/api', routes) // We need to apply the changes to our server, in this case we add an /api endpoint

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
