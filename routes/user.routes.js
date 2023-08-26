const express = require('express'); // Express is necessary for router

const router = express.Router() // We need router to modify the routes of user


const User = require("../models/user.model.js") // I need the model( in simple words the template of a possible user )

router.post("/signup", async (req, res) => { // We need to modify router in order to create operations inside some routes, in this case a post operation which is the C of CRUD
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }) // This is the model applied to an post, note the req.body.username and the others, those are part of the body of your post
    // In order to create a User you need to do {"username": "something"...} and send it to this route( in this case /signup and configured as post )
    
    try{
        const userSave = await user.save() // note the await, it's necessary to enhance de optimization of our code, here we create a variable which save the previous user information
        res.status(200).json({message: "Succsessfull"}) // If our user information were correct well it's time to tell us with a status of 200( we use it just if our code works ) and a json message
                                                        // that our code works
    } catch (err) {
        res.status(400).json({message:err.message}) // In case our code didn't work for some reason we use a err status of 400 and err.message is the error that our server provided to us
    }
})

module.exports = router; //Remember we modified the router so we need to export this router to change it in the server like x = 1 and then x += 2, we change the router like a variable
