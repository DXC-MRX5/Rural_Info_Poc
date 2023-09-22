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

  readAllData: (modelName, inclution) => {
    if(!inclution){
      return new Promise(async (resolve, reject) => {
        try {
          const getAllData = await modelName.findAll({});
          resolve(getAllData);
        } catch (err) {
          return reject(err);
        }
      })
    }
    return new Promise(async (resolve, reject) => {
      try {
        const getAllData = await modelName.findAll(inclution);
        resolve(getAllData);
      } catch (err) {
        return reject(err);
      }
    })
  },

  readSpecificData: (modelName, condition) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getData = await modelName.findOne(condition);
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
