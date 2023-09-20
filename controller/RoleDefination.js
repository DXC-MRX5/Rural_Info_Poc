const dtbs = require("../config/config");
const Role = dtbs.Role_definations;
const operation = require("./Operation");
const moment = require("moment");
const { handleError } = require("../middleware/errorHandling");
const messages = require("../messages");

const addRole = async (req, res)=>{
    const receivedData = req.body;
    try{
        const roleCreation = await operation.createData([], null, Role, receivedData)
        return res.send({
            message: messages.success.roleCreation,
            data: roleCreation
        })
    }
    catch (err) {
        let obj = {
          timestamp: moment().unix(),
          status: 400,
          message: handleError(err),
          err: {},
        };
        return res.send(obj);
    }
}

const roleData = async (req,res)=>{
    try {
        const allRoleData = await operation.readAllData(Role);
        return res.send(allRoleData);
      } catch (err) {
        let obj = {
          timestamp: moment().unix(),
          status: 400,
          message: messages.failure.failToReadData,
          err: {},
        };
        return res.send(obj);
      }
};

const specificRoleData = async (req,res)=>{
    const receivedData = req.body;
    try {
        const RoleData = await operation.readSpecificData(Role, "roleId", receivedData.roleId);
        return res.send(RoleData);
      } catch (err) {
        let obj = {
          timestamp: moment().unix(),
          status: 400,
          message: messages.failure.failToReadData,
          err: {},
        };
        return res.send(obj);
      }
};
module.exports = {addRole, roleData, specificRoleData}