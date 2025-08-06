const express = require("express");
const logger = require("./logger"); // Import the logger

const app = express();

const PORT = process.env.PORT || 7777;

app.get("/", (req, res) => {
   logger.info(`Received request on ${req.originalUrl} from ${req.ip}`);
  res.send("Welcome to DevTinder Backend");
});

app.get("/test",(req,res)=>{
    logger.info(`Received request on /test from ${req.ip}`);
    res.send("This is a test endpoint");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
