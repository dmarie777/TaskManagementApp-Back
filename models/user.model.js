const mongoose = require("mongoose") // We need to modify the mongoose model or way that our information is stored

const userSchema = new mongoose.Schema({ // Here we create a new Schema or column which helps us to organize data, in this case user, we will create more like this so remember the sintaxis
        username: { // In this case it's the same to every data but password will change in the future
            required: true, // We inform our database that our username is strictly necessary
            type: String // Here we declare the data type of our username and the same with email and password
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
) // We need to use the model that we created with mongoose, the syntaxis here is flexible but we will se it in the future, userSchema was declared before and User is the name
