const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Classes = sequelize.define('Students', {
        class_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stud_id: {
            type: DataTypes.INTEGER,   //Начинаю описывать вторичные ключи для создания связей для ORL Sequelize
            references: {
                model: 'students', //имя таблицы
                key: 'stud_id'
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        class_date: {
            type: DataTypes.STRING
        },
        class_time: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'classes',
        timestamps: false
        
    })


module.exports = Classes;