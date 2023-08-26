const express = require('express');

const router = express.Router()


const User = require("../models/user.model.js")

router.post("/signup", async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    
    try{
        const userSave = await user.save()
        res.status(200).json({message: "Succsessfull"})
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

module.exports = router;