const express = require('express')

const connectDB = require('./config/database')
const logger = require("./logger");
const app = express()

const PORT = process.env.PORT || 3000


connectDB().then(
    ()=>{
        logger.info('Connected to DB successfully!')
        app.listen(PORT,()=>{
            logger.info('Server started on port '+PORT)
        })
    }
).catch((err)=>{
    logger.error(`Error connecting to DB: ${err}`)
})