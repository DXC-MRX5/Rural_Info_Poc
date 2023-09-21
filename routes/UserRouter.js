const router = require('express').Router();
const {userRegister, checkUserData, userLogin, changeUserRole}=require("../controller/User");
const jwtAuthorizer = require('../middleware/JwtAuthorizer');
const roleChecker = require('../middleware/Rolechecker');

router.post('/registerUser', userRegister);
router.get('/allUserData', checkUserData);
router.get('/loginUser', userLogin);
router.put('/changeRole', jwtAuthorizer, roleChecker, changeUserRole);

module.exports = router;