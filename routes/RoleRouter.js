const router = require('express').Router();
const {addRole, getAllRole, specificRoleData, changeRoleDefination}=require("../controller/RoleDefination");
const jwtAuthorizer = require('../middleware/JwtAuthorizer');

router.post('/addRole', addRole);
router.put('/changeRoleAccesses', changeRoleDefination);
router.get('/allRoleData', getAllRole);
router.get('/roleData', specificRoleData);

module.exports = router;
// jwtAuthorizer,