const Operation = require("../controller/Operation");
const dtbs = require("../config/config");
const Role = dtbs.Role_definations;
const moment = require("moment");
const messages = require("../messages");

const roleChecker = async (req, res, next)=>{
    const receivedData = req.userInfo;
    if(!receivedData){
        return res.send({message: "Something Went Wrong in RoleChecking!"})
    }
    try {
        const validate = await Operation.readSpecificData(Role, "roleId", receivedData.role);
        if(validate){
            req.userInfo = validate.defination;
        }
    } catch (err) {
        let obj = {
          timestamp: moment().unix(),
          status: 400,
          message: messages.failure.unauthorizedUser,
          err: {err},
        };
        return res.send(obj);
    }
    next();
};

module.exports = roleChecker;