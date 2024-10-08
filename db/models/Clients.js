const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Clients = sequelize.define('Client', {
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group_id:{
    type: DataTypes.INTEGER,
    references: {
        model: 'groups',
        key: 'group_id'
    }
},
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  patronymic: {
    type: DataTypes.STRING,
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
  },
  emergency_contact_name: {
    type: DataTypes.STRING,
  },
  emergency_contact_phone: {
    type: DataTypes.STRING,
  },
  contacts: {
    type: DataTypes.TEXT,
  },
  phone:{
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = Clients;
