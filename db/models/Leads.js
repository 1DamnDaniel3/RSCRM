const {DataTypes} = require('sequelize');
const sequelize = require('../connection');


const Leads = sequelize.define('Leads', {
        
    lead_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firt_name:{
        type: DataTypes.STRING
    },
    second_name:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    qualification: {
        type: DataTypes.TEXT
    },
    trial_date:{
        type: DataTypes.STRING
    } 

},{
    tableName: 'leads',
    timestamps: false
})

module.exports = Leads;