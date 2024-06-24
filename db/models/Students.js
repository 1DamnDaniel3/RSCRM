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
            references: {
                model: 'leads', //имя таблицы
                key: 'lead_id'}
            },
        abon_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'abonements',
                key: 'abon_id'
            }
        },
        group_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'groups',
                key: 'group_id'
            }
        },
        second_name: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        patronymic: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.STRING
        },
        hiredate: {
            type: DataTypes.STRING
        }
        
    }, {
        tableName: 'students',
        timestamps: false
        
    })

module.exports = Students;