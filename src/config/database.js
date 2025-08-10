const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://faisal25march99:Sckb77VJroPuBHkc@cluster0.978nz9q.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDB()