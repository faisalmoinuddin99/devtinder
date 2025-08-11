const express = require('express')

const connectDB = require('./config/database')
const logger = require("./logger");
const {User} = require("./models/User");
const {Signup} = require("./controller/Signup");
const {getUsers} = require("./controller/userController");

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/signup',Signup)



app.get("/users", getUsers )

app.use((req,res,next)=>{
    res.status(404).send({
        error: 'Route Not Found',
        statusCode: 404
    });
})

connectDB
    .then(()=>{
    logger.info('Connected to DB successfully.')

    app.listen(PORT,()=>{logger.info(`Server is running on server ${PORT}`)})
}).catch((err)=>{logger.error(err)})