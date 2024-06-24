const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Event = sequelize.define('Event', {
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_type: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'event',
        timestamps: false
    })


module.exports = Event;