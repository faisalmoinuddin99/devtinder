const {User} = require("../models/User");


const getAllUser = async ()=>{
  return User.find({});
}
const getUserCount = async () => {
    return User.countDocuments();
}

const getUserByEmail = async (email) => {
    return User.find({emailId: email})
}

const getUserByIdAndUpdate = async (userId, data) => {
    console.log("Repository: "+userId);
    return User.findByIdAndUpdate({_id: userId},data,{returnDocument:'after'})
}
module.exports = {
    getAllUser,
    getUserCount,
    getUserByEmail,
    getUserByIdAndUpdate
}