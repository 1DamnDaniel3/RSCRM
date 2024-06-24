const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Abonements = sequelize.define("Abonements",{

        abon_id: { // Описание полей БД 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        abon_type: {
            type: DataTypes.STRING
        },
        abon_cost: {
            type: DataTypes.STRING
        }
            

    }, {
        tableName: "abonements",
        timestamps: false
    });
    
module.exports = Abonements;