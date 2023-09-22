const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();
const Op = Sequelize.Op;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};
const { DB, USER, PASSWORD, HOST, DB_PORT } = process.env;

const messages = require("../messages");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  port: DB_PORT,
  operatorsAliases,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

/* Checking if the database is connected or not. */

sequelize
  .authenticate()
  .then(() => {
    console.info(messages.success.dbConfig01);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const dtbs = {};

fs.readdirSync(path.join(__dirname, "../model"))
.filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== path.basename && file.slice(-3) === ".js" // .filter((file) => file.endsWith(".js"))
    );
  })
.forEach((file) => {
    const model = require(path.join(__dirname, "../model/" + file))(
      sequelize,
      Sequelize.DataTypes
    );

    dtbs[model.name] = model;
  });

/* Creating a relationship between the tables. */

Object.keys(dtbs).forEach((modelName) => {
  if (dtbs[modelName].associate) {
    dtbs[modelName].associate(dtbs);
  }
});

// console.log(dtbs);

// Sync all models in the folder
sequelize
  .sync({alter:false})
  .then(() => {
    console.log("synced to respective Table.");
  })
  .catch((err) => {
    console.log("error in syncing to tables", err);
  });

// Managing Relationships between Models.


// ono-to-many relation between State and District
dtbs.states.hasMany(dtbs.districts,{
  foreignKey: "stateId",
  as: 'DistrictInformations'
})
dtbs.districts.belongsTo(dtbs.states, {
  foreignKey: "stateId",
  as: "StateInformations"
})

// ono-to-many relation between District and Village
dtbs.districts.hasMany(dtbs.villeges,{
  foreignKey: "districtId",
  as: 'VillageInformations'
})
dtbs.villeges.belongsTo(dtbs.districts, {
  foreignKey: "districtId",
  as: "DistrictInformations"
})

// ono-to-many relation between District and Village
dtbs.users.hasOne(dtbs.Role_definations, {
  foreignKey: "roleId",
  as: "roleInformation"
})
dtbs.Role_definations.belongsTo(dtbs.users, {
  foreignKey: "roleId",
  as: "userInformation"
})

module.exports = dtbs;