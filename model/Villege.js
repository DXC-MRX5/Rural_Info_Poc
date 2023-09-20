const Villege = (sequelize, Sequelize) =>{
    const villegeModel  = sequelize.define('villeges', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        districtId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return villegeModel;
}
module.exports = Villege;