const {User} = require("../models/User");
const {loggers} = require("winston");

const Signup = async (req,res)=> {


    console.log(req.body)

    //  create a new instance of User Model
    try {
        const user = new User(req.body)
        await user.save()

        res.status(201).send({
            user: user,
            message: "User created successfully."
        })
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).send({
                message: error.message,
            })
        }
        res.status(500).send({
            error: 'Error Creating user',
            status: 500,
        })
    }
}

module.exports = {Signup}