const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Abonements = sequelize.define("Abonements",{

    abon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abon_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abon_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessions: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'abonements',
    timestamps: false
});
    
module.exports = Abonements;