const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Weekday_groups = sequelize.define('Weekday_groups', {
    wkd_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'wkd_id',
    },
    weekday_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'weekday',
            key: 'weekday_id'
        },
        field: 'weekday_id',
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'group_id'
        },
        field: 'group_id'
    }
}, {
    tableName: 'weekday_groups',
    timestamps: false
});

module.exports = Weekday_groups;