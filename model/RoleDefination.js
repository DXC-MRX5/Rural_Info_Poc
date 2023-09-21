const RoleDefination = (sequelize,Sequelize)=>{ 
    const roleModel = sequelize.define('Role_definations', {
    roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    defination: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    changeUserRole: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    getAllUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    addNewRole: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    manipulateStateCoordinator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    manipulateDistrictCoordinator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    manipulateVillageCoordinator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    assignCoordinates: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    changeRoleDefination: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
return roleModel;
}

module.exports = RoleDefination;