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
module.exports = {
    getAllUser,
    getUserCount,
    getUserByEmail,
}