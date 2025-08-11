const userService = require('../service/userService');


const getUsers = async (req,res)=>{

    try{
        const result = await userService.fetchUsersWithCount()
        console.log("RESULT: "+JSON.stringify(result))
        if(result.isEmpty) {
            return res.send(result.message)
        }else {
            return res.status(200).send({
                data: result.data,
                count: result.count
            })
        }
    }catch (err) {
        return res.status(400).send({
            message: "Oops, something went wrong",
            error: err.message
        })
    }
}

module.exports = {getUsers}