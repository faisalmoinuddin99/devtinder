const userRepository = require('../repository/userRepository')


const fetchUsersWithCount = async ()=>{
    const users = await userRepository.getAllUser()
    const count = await userRepository.getUserCount()

    console.log("RESULT: "+count)
    console.log(users)

    if(users.length === 0) {
        return {
            isEmpty: true,
            message: "Database is empty"
        }
    }else {
        return {
            isEmpty: false,
            data: users,
            count: count
        }
    }
}


const fetchUserByEmail = async (email) => {
    console.log("EMAIL:" + email)
    const user = await userRepository.getUserByEmail(email)
    console.log("RESULT: "+user)
    if(!user){
        return {
            isEmpty: true,
            message: "User does not exist"
        }
    }else {
        return {
            isEmpty: false,
            data: user
        }
    }
}

const updateUserById = async(userId,updatedData)=>{
    const user = await userRepository.getUserByIdAndUpdate(userId,updatedData)

    if(!user) {
        return {
            isEmpty: true,
            message: "User does not exist"
        }
    }else {
        return {
            isEmpty: false,
            data: updatedData
        }
    }
}

module.exports = {fetchUsersWithCount, fetchUserByEmail, updateUserById}