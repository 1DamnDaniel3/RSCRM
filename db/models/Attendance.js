const {DataTypes} = require('sequelize');
const sequelize = require('../connection')

const Attendance = sequelize.define("Attendance", {
        attendance_id: {
            type: DataTypes.INTEGER,
            pimaryKey: true,
            autoIcrement: true
        },
        stud_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'students',
                key: 'stud_id'
            }
        }
    },{
        tableName: 'attendance',
        timestamps: false
    })


module.exports = Attendance;