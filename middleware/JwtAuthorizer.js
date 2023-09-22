require("dotenv").config();
const jwt = require("jsonwebtoken");
const messages = require("../messages");
const secretKey = process.env.SECRET_KEY;
const moment = require("moment");
const Operation = require("../controller/Operation");

const jwtAuthorizer = async (req, res, next) => {
  const receivedToken = req.headers["authorization"];
  if (!receivedToken) {
    return res.status(200).send({ message: messages.failure.unauthorizedUser });
  }
  const token = receivedToken.split(" ")[1];
  try {
    const validate = jwt.verify(token, secretKey);
    if(!validate.role){
      console.log("sasfsdga", messages.failure.unauthorizedUser);
      return res.send({message: messages.failure.unauthorizedUser});
    }
    const roleCheck = await Operation.readSpecificData(Role, "roleId", validate.role)
    console.log("getting this by validating role >>>", roleCheck);
    req.userInfo = validate;
    console.log("getting this from jwtMiddleware ---->> ", validate);
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
module.exports = jwtAuthorizer;