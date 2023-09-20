const District = (sequelize, Sequelize) =>{
    const districtModel  = sequelize.define('districts', {
        districtId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stateId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return districtModel;

}

module.exports = District;