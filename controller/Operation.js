const messages = require("../messages");
module.exports = {
  createData: (modelName, dataObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataCreation = await modelName.create(dataObj);
        resolve(dataCreation);
      } catch (err) {
        return reject(err);
      }
    });
  },

  readAllData: (modelName) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getAllData = await modelName.findAll({});
        resolve(getAllData);
      } catch (err) {
        return reject(err);
      }
    });
  },

  readSpecificData: (modelName, whatToMatch, whomeToMatch) => {
    return new Promise(async (resolve, reject) => {
      let condition = {
        [whatToMatch]: whomeToMatch,
      };
      console.log("printing dynamic condition ----", condition);
      try {
        const getData = await modelName.findOne({ where: condition });
        resolve(getData);
      } catch (err) {
        return reject(err);
      }
    });
  },

  updateSpecificData: (modelName, whatToMatch, whomeToMatch, updates) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateData = await modelName.update(
          updates,
          { where: {[whatToMatch]:whomeToMatch} }
        );
        resolve(updateData);
      } catch (err) {
        return reject(err);
      }
    });
  },
};
