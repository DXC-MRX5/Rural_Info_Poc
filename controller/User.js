const bcrypt = require("bcryptjs");
const db = require("../config/config");
const { handleError } = require("../middleware/errorHandling");
const User = db.User;
const saltRounds = 12;
const moment = require('moment')
const userRegister = async (req, res)=>{
    const userInfo = req.body;
    try{
        if(!userInfo.password){
            return res.json({message:"All the Fields are Mandetory!"});
        }
        const hashedPass = bcrypt.hashSync(userInfo.password, saltRounds);
        userInfo.password = hashedPass;
       const newUserData = await User.create(userInfo);
       return res.send({message:"New user created...", data: newUserData})
    }
    catch (err){
        let obj = {
            timestamp: moment().unix(),
            status : 400,
            message : handleError(err),
            err : {}
        }
        return res.send(obj)
    }
}

const userData = async (req, res) =>{
    try{
        const data = await User.findAll({});
        return res.send(data);
    }
    catch(err){
        console.log("error occured...", err);
        return res.send({message:"An Error cured while Retrieving data..."})
    }
}

module.exports = {userRegister, userData};