const {DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Authorisation = sequelize.define('Authorisation', {
        authorisation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        event_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'event_id'
            }
        },
        date_time: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'authorisation',
        timestamps: false
    })


module.exports = Authorisation;