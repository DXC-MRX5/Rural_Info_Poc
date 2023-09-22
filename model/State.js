const State = (sequelize, Sequelize) => {
    const stateModel = sequelize.define('states', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return stateModel;
}
module.exports = State;