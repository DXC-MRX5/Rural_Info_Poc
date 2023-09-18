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
    }
})
return roleModel;
}

module.exports = RoleDefination;