const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Weekday = sequelize.define('Weekday', {
        weekday_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'weekday_id'
        },
        weekday_name:{
            type: DataTypes.STRING,
            field: 'weekday_name',
        }
    
        
    }, {
        tableName: 'weekday',
        timestamps: false

    })
    
module.exports = Weekday;