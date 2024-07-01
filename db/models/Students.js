const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Students = sequelize.define('Students', {
        stud_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lead_id: {
            type: DataTypes.INTEGER,   //Начинаю описывать вторичные ключи для создания связей для ORM Sequelize
            allowNull: false,
            references: {
                model: 'leads', //имя таблицы
                key: 'lead_id'}
            },
        group_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'groups',
                key: 'group_id'
            }
        },
        second_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        patronymic: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hiredate: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        tableName: 'students',
        timestamps: false
        
    })

module.exports = Students;