const {User} = require("../models/User");
const {loggers} = require("winston");

const Signup = async (req,res)=> {
    //  create a new instance of User Model

    try {
        const user = new User({
            firstName: "Leo",
            lastName: "Messi",
            emailId: "leo_messi@gmail.com",
            password: "messi@1234",
            gender: "male",
            age: 33
        })
        await user.save()

        res.status(201).send({
            user: user,
            message: "User created successfully."
        })
    } catch (error) {
        res.status(500).send({
            error: 'Error Creating user',
            status: 500,
        })
    }
}

module.exports = {Signup}