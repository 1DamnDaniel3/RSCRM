const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Weekday = sequelize.define('Weekday', {
        weekday_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weekday_name:{
            type: DataTypes.STRING
        }
    
        
    }, {
        tableName: 'weekday',
        timestamps: false

    })
    
module.exports = Weekday;