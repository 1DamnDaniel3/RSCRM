const {DataTypes} = require('sequelize');
const sequelize = require('../connection')


const Payment = sequelize.define('Payment', {

        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        abon_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'abonements',
                key: 'abon_id'
            }
        },
        lead_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'leads',
                key: 'lead_id'
            }
        },
        payment_date: {
            type: DataTypes.STRING
        }


    }, {
        tableName: 'payment',
        timeStaps: false
    })

module.exports = Payment;