const messages = require("../messages");
const dtbs = require("../config/config");
const moment = require("moment");
const Operation = require("./Operation");
const state = dtbs.states;
const district = dtbs.districts;
const village = dtbs.villeges;

const addStates = async (req, res) => {
  const receivedData = req.body;
  if (!receivedData[0].name) {
    return res.send({ message: messages.failure.emptyFields });
  }
  try {
    const stateData = await state.bulkCreate(receivedData);
    return res.send({ message: messages.success.creation, data: stateData });
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

const addDistricts = async (req, res) => {
  const receivedData = req.body;
  try {
    const districtData = await district.bulkCreate(receivedData);
    return res.send({ message: messages.success.creation, data: districtData });
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

const addVillages = async (req, res) => {
  const receivedData = req.body;
  try {
    const villageData = await village.bulkCreate(receivedData);
    return res.send({ message: messages.success.creation, data: villageData });
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

const getStateDistricts = async (req, res) => {
  const stateId = req.body;
  const query = {
    include: [
      {
        model: district,
        as: "DistrictInformations",
      },
    ],
    where: stateId,
  };
  try {
    const data = await Operation.readAllData(state, query);
    return res.send(data);
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

const getDistrictVillages = async (req, res) => {
  const distId = req.body;
  const query = {
    include: [
      {
        model: village,
        as: "VillageInformations",
      },
    ],
    where: distId,
  };
  try {
    const data = await Operation.readAllData(district, query);
    return res.send(data);
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

const getVillageState = async (req, res) => {
  const villCode = req.body;
  const query = {
    include: [
      {
        model: district,
        as: "DistrictInformations",
        include: [
          {
            model: state,
            as: "StateInformations",
          },
        ],
      },
    ],
    where: villCode
  };
  try {
    const data = await Operation.readSpecificData(village, query);
    return res.send({ data: data });
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

module.exports = {
  addStates,
  addDistricts,
  addVillages,
  getStateDistricts,
  getDistrictVillages,
  getVillageState
};
