const {DataTypes} = require('sequelize');
const sequelize = require('../connection');


const Weekday_groups = sequelize.define('Weekday_groups', {
        weekday_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'weekday',
                key: 'weekday_id'
            }
        },
        
        group_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'groups',
                key: 'group_id'
            }
        }
            
    }, {
        tableName: 'weekday_groups',
        timestamps: false
    })

module.exports = Weekday_groups;