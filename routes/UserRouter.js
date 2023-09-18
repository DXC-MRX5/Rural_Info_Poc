const router = require('express').Router();
const {userRegister, userData}=require("../controller/User");

router.post('/addUser', userRegister);
router.get('/userdata', userData);

module.exports = router;