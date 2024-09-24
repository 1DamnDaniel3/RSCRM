const sequelize = require('./connection')

//Import models:
const Abonements = require('./models/Abonements')
const Attendance = require('./models/Attendance')
const Authorisation = require('./models/Authorisation')
const Classes = require('./models/Classes')
const Event = require('./models/Event')
const Groups = require('./models/Groups')
const Leads = require('./models/Leads')
const Payment = require('./models/Payment')
const Students = require('./models/Students')
const Users = require('./models/Users')
const Weekday_groups = require('./models/Weekday_groups')
const Weekday = require('./models/Weekday')
const UserToken = require('./models/User_token')
const StudentsAbonements = require('./models/Students_abonements')
const FixAbonements = require('./models/Fix_abonements')
const Clients = require("./models/Clients")
const Entity_groups = require("./models/Entity_groups")



//Make links between models

Clients.hasMany(Students, {foreignKey: "client_id", onDelete: 'CASCADE'}); // CLIENTS
Students.belongsTo(Clients, {foreignKey: 'client_id', onDelete: 'CASCADE'});

Clients.hasMany(Payment, {foreignKey: "client_id", onDelete: 'CASCADE'}); 
Payment.belongsTo(Clients, {foreignKey: 'client_id', onDelete: 'CASCADE'});

Abonements.hasMany(StudentsAbonements, {foreignKey: 'abon_id', onDelete: 'CASCADE' });// ABONEMENTS
StudentsAbonements.belongsTo(Abonements, {foreignKey: 'abon_id'});

Abonements.hasMany(Payment, {foreignKey: 'abon_id', onDelete: 'CASCADE' });
Payment.belongsTo(Abonements, {foreignKey: 'abon_id'});

Groups.hasMany(Students, {foreignKey: 'group_id', onDelete: 'CASCADE' }); // GROUPS
Students.belongsTo(Groups, {foreignKey: 'group_id'});

Groups.hasMany(Weekday_groups, {foreignKey: 'group_id', onDelete: 'CASCADE' }) ;
Weekday_groups.belongsTo(Groups, {foreignKey: 'group_id'});

Groups.hasMany(Clients, {foreignKey: 'group_id', onDelete: 'SET NULL'});
Clients.belongsTo(Groups, {foreignKey: 'group_id', onDelete: 'SET NULL'});

Groups.hasMany(Leads, {foreignKey: 'group_id', onDelete: 'SET NULL' }) ;
Leads.belongsTo(Groups, {foreignKey: 'group_id'});

Groups.hasMany(Entity_groups, {foreignKey: 'group_id', onDelete: 'CASCADE' }) ;
Entity_groups.belongsTo(Groups, {foreignKey: 'group_id'});
  
Weekday.hasMany(Weekday_groups, {foreignKey: 'weekday_id', onDelete: 'CASCADE' }); // WEEKDAY
Weekday_groups.belongsTo(Weekday, {foreignKey: 'weekday_id'});

Users.hasMany(Authorisation, {foreignKey: 'user_id', onDelete: 'CASCADE' }); // USER
Authorisation.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(Authorisation, {foreignKey: 'user_id', onDelete: 'CASCADE' });
Authorisation.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(UserToken, {foreignKey: 'user_id', onDelete: 'CASCADE' });
UserToken.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(Classes, {foreignKey: 'user_id', onDelete: 'CASCADE' });
Classes.belongsTo(Users, {foreignKey: 'user_id'});

Students.hasMany(Classes, {foreignKey: 'stud_id', onDelete: 'CASCADE' }); //STUDENTS
Classes.belongsTo(Students, {foreignKey: 'stud_id'});

Students.hasMany(StudentsAbonements, {foreignKey: 'stud_id', onDelete: 'CASCADE' });
StudentsAbonements.belongsTo(Students, {foreignKey: 'stud_id'});

Students.hasMany(Attendance, {foreignKey: 'stud_id', onDelete: 'CASCADE' });
Attendance.belongsTo(Students, {foreignKey: 'stud_id'});

StudentsAbonements.hasMany(FixAbonements, {foreignKey: 'stud_abon_id', onDelete: 'CASCADE' }); // STUDENTS_ABONEMENTS
FixAbonements.belongsTo(StudentsAbonements, {foreignKey: 'stud_abon_id'});

Event.hasMany(Authorisation, {foreignKey: 'event_id', onDelete: 'CASCADE' }); // EVENTS
Authorisation.belongsTo(Event, {foreignKey: 'event_id'});

module.exports = { // export models with their links
    sequelize,
    Abonements,
    Attendance,
    Authorisation,
    Classes,
    Event,
    Groups,
    Entity_groups,
    Leads,
    Clients,
    Payment,
    Students,
    StudentsAbonements,
    Users,
    UserToken,
    Weekday_groups,
    Weekday,
    FixAbonements,
};