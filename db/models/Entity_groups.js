const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Entity_groups = sequelize.define('Entity_groups', {
  entity_group_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  entity_type:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  group_id:{
    type: DataTypes.INTEGER,
    references: {
        model: 'groups',
        key: 'group_id'
    }
},
}, {
  tableName: 'entity_groups',
  timestamps: false,
});

module.exports = Entity_groups;
