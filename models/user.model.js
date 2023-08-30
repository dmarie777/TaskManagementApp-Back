const mongoose = require("mongoose") // We need to modify the mongoose model or way that our information is stored

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model(
    "User",
    userSchema
)
