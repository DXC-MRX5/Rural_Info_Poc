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
sequelize
  .authenticate()
  .then(() => {
    console.log(messages.success.dbConfig01);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const modelsFolder = path.join(__dirname, "../model");

// Sync all models in the folder
fs.readdirSync(modelsFolder)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsFolder, file))(
      sequelize,
      Sequelize.DataTypes
    );
    model
      .sync({ force: false }) // Sync each model with the database
      .then(() => {
        console.log("Synced all models with their respective Tables");
      });
  });

const db = {};
db.sequelize = sequelize;
db.User = require("../model/User")(sequelize, Sequelize);
db.Role = require("../model/RoleDefination")(sequelize, Sequelize);

module.exports = db;
