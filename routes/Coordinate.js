const router = require('express').Router();
const { addStates, addDistricts, addVillages, getStateDistricts, getDistrictVillages, getVillageState } = require('../controller/Coordinate');

router.post('/addState', addStates);
router.post('/addDistrict', addDistricts);
router.post('/addVillage', addVillages);
router.get('/getStDist', getStateDistricts);
router.get('/getDistVill', getDistrictVillages);
router.get('/getVillSt', getVillageState);

module.exports = router;