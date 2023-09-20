const router = require('express').Router();
const {addRole, roleData, specificRoleData}=require("../controller/RoleDefination");

router.post('/addRole', addRole);
router.get('/allRoleData', roleData);
router.get('/roleData', specificRoleData);

module.exports = router;