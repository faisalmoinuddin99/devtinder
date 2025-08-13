const express = require('express')

const connectDB = require('./config/database')
const logger = require("./logger");

const {Signup} = require("./controller/Signup");
const {getUsers, getUserByEmail, updateUserById} = require("./controller/userController");
const {User} = require("./models/User");

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/signup', Signup)

app.get("/feed", getUsers)

app.get('/user/email', getUserByEmail)

app.patch('/user', async (req, res) => {
    const userId = req.body.userId
    console.log(userId)
    res.send(userId)
})

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