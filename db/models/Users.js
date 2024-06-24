const {DataTypes} = require('sequelize');
const sequelize = require('../connection');
const bcrypt = require("bcryptjs")

const Users = sequelize.define('Users', {
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type:{
            type: DataTypes.STRING
        },
        second_name:{
            type: DataTypes.STRING
        },
        first_name:{
            type: DataTypes.STRING
        },
        patronymic:{
            type: DataTypes.STRING
        },
        pasport_data:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary:{
            type: DataTypes.STRING
        },
        hiredate:{
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false, 
          },
    }, {
        hooks: {
             beforeCreate: async(user)=>{ // ВЫБРАТЬ МЕТОД ХЕШИРОВАНИЯ ПАРОЛЕЙ (В КОНТРОЛЛЕРЕ ИЛИ В МОДЕЛИ)
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
             },
             beforeUpdate: async(user) =>{
                if( user.changed('password')) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
             }
        },
        tableName: 'users',
        timestamps: false
    })

module.exports = Users;