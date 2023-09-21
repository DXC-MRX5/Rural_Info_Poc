require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dtbs = require("../config/config");
const User = dtbs.users;
const operation = require("./Operation");
const saltRounds = 12;
const messages = require("../messages");
const moment = require("moment");
const { handleError } = require("../middleware/errorHandling");

const userRegister = async (req, res) => {
  const receivedData = req.body;
  const passwordchecker = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if(!receivedData.password){
    return res.send({message: messages.failure.emptyFields})
  }
  const strongPass = passwordchecker.test(receivedData.password);
  if(!strongPass){
    return res.send({message: messages.failure.weakPassword});
  }
  const hashedPassword = bcrypt.hashSync(receivedData.password, saltRounds);
  receivedData.password = hashedPassword;
  try {
    const userCreation = await operation.createData(
      User,
      receivedData
    );
    return res.send({
      message: messages.success.userCreation,
      data: userCreation,
    });
  } catch (err) {
    let obj = {
      timestamp: moment().unix(),
      status: 400,
      message: handleError(err),
      err: {},
    };
    return res.send(obj);
  }
};
const checkUserData = async (req, res) => {
  try {
    const allUserData = await operation.readAllData(User);
    return res.send(allUserData);
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
const userLogin = async (req, res) => {
  const loginData = req.body;
  if (!loginData.password || !loginData.mobile) {
    return res.send({ message: messages.failure.emptyFields });
  }
  try {
    // Checking the user existing or not.
    const userData = await operation.readSpecificData(
      User,
      "mobile",
      loginData.mobile
    );
    if (!userData) {
      return res.send({ message: messages.failure.newUserLogin });
    }

    // Checking the Password.
    const isValidPassword = bcrypt.compareSync(
      loginData.password,
      userData.password
    );
    if (!isValidPassword) {
      return res.send({ message: messages.failure.wrongPassword });
    }

    // Generating a JWT token.
    const token = jwt.sign(
      { userId: userData.id, role: userData.roleId },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );
    return res.send({
      message: messages.success.userLogin,
      Token: token,
      userName: userData.userName,
    });
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

const changeUserRole = async (req, res)=>{
  const roleData = req.userInfo
  const receivedData = req.body;
  if(!receivedData.id || !receivedData.newroleId){
    return res.send({message: messages.failure.emptyFields});
  }
  try{
    const updatedData = await operation.updateSpecificData(User, "id", receivedData.id, "roleId", receivedData.newroleId);
    return res.send({message: messages.success.roleUpdate, data: updatedData});
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

module.exports = { userRegister, checkUserData, userLogin, changeUserRole };
