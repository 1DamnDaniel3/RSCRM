const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Groups = sequelize.define('Groups', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_name: {
            type: DataTypes.STRING,
        },
    },{
        tableName: 'groups',
        timestamps: false
    })

module.exports = Groups;