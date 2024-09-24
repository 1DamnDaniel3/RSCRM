const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

// this table for fixing abonements and write date of stop and start
const FixAbonements = sequelize.define('FixAbonement', {
  fix_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  stud_abon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'StudentsAbonement',
      key: 'stud_abon_id', 
    },
  },
  start_fix_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_fix_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'fix_abonements', 
  timestamps: false, 
});

module.exports = FixAbonements;