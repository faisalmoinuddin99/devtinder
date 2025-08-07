const express = require("express");
const logger = require("./logger"); // Import the logger

const app = express();

const PORT = process.env.PORT || 7777;

app.get("/", (req, res) => {
   logger.info(`Received request on ${req.originalUrl} from ${req.ip}`);
  res.send("Welcome to DevTinder Backend");
});

app.get("/user",(req,res)=>{
    res.send({
        firstName: "John",
        lastName: "Doe",
    })
})

app.post("/user", (req, res) => {
    res.send("User created successfully");
})

let count = 0
app.get('/a{b}c', async (req, res) => {
  res.send(`Test endpoint hit ${++count} times`);
})

app.get("/user/:id/:password",(req,res)=>{
  console.log(req.params)
  res.send({
    firstName: "John",
    lastName: "Doe",
    id: req.params.id
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
