const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
    }
})

const User = mongoose.model("User",userSchema)

module.exports = {User}