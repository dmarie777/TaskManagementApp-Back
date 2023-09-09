const mongoose = require("mongoose") // We need to modify the mongoose model or way that our information is stored
const bcrypt = require('bcrypt')

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

///Adding bcrypt to hash our passwords
const saltRounds = 10;
userSchema.pre('save', function(next) {
    //check if document is new or a new password has been set
    if(this.isNew || this.isModified('password')) {
        //Saving reference to this because of changing scopes 
        const document = this;
        bcrypt.hash(document.password, saltRounds, 
            function(err, hashedPassword) {
                if(err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});
/////////////Authentication///////////////////

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

const User = mongoose.model(
    "User",
    userSchema
)
module.exports = User
