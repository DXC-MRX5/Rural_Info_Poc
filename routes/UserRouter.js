const router = require('express').Router();
const {userRegister, checkUserData, userLogin, changeUserRole, checkUser}=require("../controller/User");
const jwtAuthorizer = require('../middleware/JwtAuthorizer');
const roleChecker = require('../middleware/Rolechecker');

router.post('/registerUser', userRegister);
router.get('/allUserData', checkUserData);
router.get('/userData', checkUser);
router.get('/loginUser', userLogin);
router.put('/changeRole', changeUserRole);

module.exports = router;
// jwtAuthorizer, roleChecker,