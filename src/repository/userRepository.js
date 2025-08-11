const {User} = require("../models/User");


const getAllUser = async ()=>{
  return await User.find({});
}
const getUserCount = async () => {
    return await User.countDocuments()
}


module.exports = {
    getAllUser,
    getUserCount
}