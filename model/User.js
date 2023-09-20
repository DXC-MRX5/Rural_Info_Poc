const User = (sequelize, Sequelize)=>{
    const userModel = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
            async customValidator(value,next){
                try {
                    const existingUser = await userModel.findOne({
                        where: { mobile: value, id:{$ne: this.id}},
                        raw:true
                    }); 
                    if (existingUser) {
                        return next("Mobile number already has an account!");
                    }else{
                        return next()
                    }
                }
                catch (error) {
                    return next(error)
                }
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
return userModel;
}
module.exports = User;
