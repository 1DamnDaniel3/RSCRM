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
            },
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'clients',
                key: 'client_id'
            },
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }


    }, {
        tableName: 'payment',
        timestamps: false
    })

module.exports = Payment;