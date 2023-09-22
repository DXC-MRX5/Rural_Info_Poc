const dtbs = require("../config/config");
const Role = dtbs.Role_definations;
const operation = require("./Operation");
const moment = require("moment");
const { handleError } = require("../middleware/errorHandling");
const messages = require("../messages");

const addRole = async (req, res)=>{
    const receivedData = req.body;
    try{
        const roleCreation = await operation.createData(Role, receivedData)
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

const getAllRole = async (req,res)=>{
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
    const credinals = {where: receivedData};
    try {
        const RoleData = await operation.readSpecificData(Role, credinals);
        console.log("getting this from role checking ----", RoleData.Role_definations);
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

const changeRoleDefination = async (req, res) =>{
  const receivedData = req.body;
  if(!receivedData[0].roleId){
    return res.send({message: messages.failure.emptyFields});
  }
  try{
    const updatedData = await operation.updateSpecificData(Role, "roleId", receivedData[0].roleId, receivedData[1])
    console.log("multiple columns updating ====>>>", updatedData);
    return res.send({message:messages.success.roleUpdate, data: updatedData});
  } catch (err) {
    let obj = {
      timestamp: moment().unix(),
      status: 400,
      message: messages.failure.failToReadData,
      err: {},
    }
    return res.send(obj);
  }
} 

module.exports = {addRole, getAllRole, specificRoleData, changeRoleDefination}