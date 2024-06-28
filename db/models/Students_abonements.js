const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const StudentsAbonements = sequelize.define('StudentsAbonements', {
    stud_abon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stud_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'students',
            key: 'stud_id'
        }
    },
    abon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'abonements',
            key: 'abon_id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'students_abonements',
    timestamps: false
});

module.exports = StudentsAbonements;