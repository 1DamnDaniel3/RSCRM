const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Weekday_groups = sequelize.define('Weekday_groups', {
    wkd_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weekday_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'weekday',
            key: 'weekday_id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'group_id'
        }
    }
}, {
    tableName: 'weekday_groups',
    timestamps: false
});

module.exports = Weekday_groups;