const router = require('express').Router();
const dtbs = require("../config/config");
const User = dtbs.users;
const {userRegister, checkUserData, userLogin}=require("../controller/User");
const authorizer = require('../middleware/JwtAuthorizer');

router.post('/registerUser', userRegister);
router.get('/allUserData',authorizer, checkUserData);
router.get('/loginUser', userLogin);

module.exports = router;