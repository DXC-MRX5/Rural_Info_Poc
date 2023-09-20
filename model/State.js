const State = (sequelize, Sequelize) => {
    const stateModel = sequelize.define('states', {
        stateId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        districtsCount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return stateModel;
}
module.exports = State;