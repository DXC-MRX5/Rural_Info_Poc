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
  const hashing = () => {
    return (receivedData.password = bcrypt.hashSync(
      receivedData.password,
      saltRounds
    ));
  };
  try {
    const userCreation = await operation.createData(
      [receivedData.password],
      hashing,
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
  if(!loginData.password || !loginData.mobile){
    return res.send({message: messages.failure.emptyFields});
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
    const isValidPassword = bcrypt.compareSync(loginData.password, userData.password)
    if(!isValidPassword){
      return res.send({message: messages.failure.wrongPassword})
    }

    // Generating a JWT token.
    const token = jwt.sign({userId: userData.id, role: userData.roleId}, process.env.SECRET_KEY, {expiresIn: "12h"})
    return res.send({message:messages.success.userLogin, Token:token, userName: userData.userName});
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

const changeUserRole = "hsdfuighihu";

module.exports = { userRegister, checkUserData, userLogin };
