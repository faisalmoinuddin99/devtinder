const express = require('express')

const connectDB = require('./config/database')
const logger = require("./logger");

const {Signup} = require("./controller/Signup");
const {getUsers, getUserByEmail, updateUserById} = require("./controller/userController");
const {User} = require("./models/User");
const {fetchUserByEmail} = require("./service/userService");

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/signup', Signup)

app.get("/feed", getUsers)

app.get('/user/email', getUserByEmail)

app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
  //  console.log(fetchUserByEmail(req.body.emailId))
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            data,
            { returnDocument: "after" } // Mongoose v6+, else use { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        res.status(200).json({
            status: "successfully updated the user",
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


app.delete('/user', async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).send("userId is required");
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            console.log("deletedUser", deletedUser);
            return res.status(200).send("successfully deleted the user");
        } else {
            console.log("User not found");
            return res.status(404).send("user not found");
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("error while deleting user");
    }
});


app.use((req, res, next) => {
    res.status(404).send({
        error: 'Route Not Found',
        statusCode: 404
    });
})

connectDB
    .then(() => {
        logger.info('Connected to DB successfully.')

        app.listen(PORT, () => {
            logger.info(`Server is running on server ${PORT}`)
        })
    }).catch((err) => {
    logger.error(err)
})