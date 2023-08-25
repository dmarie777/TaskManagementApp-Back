// Import the required pre-install packages
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")

// Port number
const port = process.env.PORT || 3001

// Set express with the necessary parameter
app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Router
const router = express.Router()

// CRUD
router.get('/', (req, res) => {
    res.json({message: "Hello World"})
})

app.use('/',router)

// Express start
app.listen(port, function() {
    console.log("Running on " + port)
})

module.exports = app
