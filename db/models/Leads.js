const {DataTypes} = require('sequelize');
const sequelize = require('../connection');


const Leads = sequelize.define('Leads', {
        
    lead_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    second_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualification: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    trial_date:{
        type: DataTypes.STRING
    } 

},{
    tableName: 'leads',
    timestamps: false
})

module.exports = Leads;