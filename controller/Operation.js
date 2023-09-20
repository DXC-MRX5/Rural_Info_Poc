const messages = require("../messages");
module.exports = {
    createData : (conditionsToCheck, additionalSteps, modelName, dataObj) =>{
        return new Promise(async(resolve, reject) => {
            Array.isArray(conditionsToCheck) && conditionsToCheck.length && conditionsToCheck.forEach((condition) => {
                if(!condition){
                    additionalSteps = null;
                    return reject(new Error(messages.failure.emptyFields));
                }
            });
            additionalSteps ? additionalSteps() : "";
            try{
                const dataCreation = await modelName.create(dataObj);
                resolve(dataCreation);              
            }
            catch(err){
                return reject(err);
            }
        })
    },

    readAllData : (modelName)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                const getAllData = await modelName.findAll({});
                resolve(getAllData);
            }
            catch(err){
                return reject(err)
            }
        })
    },

    readSpecificData : (modelName, whatToMatch, whomeToMatch)=>{
        return new Promise(async (resolve, reject)=>{
            let condition = {
                [whatToMatch] : whomeToMatch
            }
            console.log("printing dynamic condition ----", condition);
            try{
                const getData = await modelName.findOne({ where:condition});
                resolve(getData);
            }
            catch(err){
                return reject(err)
            }
        })
    },

    updateSpecificData : (modelName, whatToMatch, whomeToMatch, dataObj)=>{
        return new Promise(async (resolve, reject)=>{
            let condition = {
                [whatToMatch] : whomeToMatch
            }
            try{
                const updateData = await modelName.update({dataObj}, {where:condition});
                resolve(updateData);
            }
            catch(err){
                return reject (err);
            }
        })
    }
}