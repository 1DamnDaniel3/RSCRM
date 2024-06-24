const {Students} = require('./db/index')
const sequelize = require('./db/connection')

// Проверка соединения с базой данных
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Пример использования моделей
Students.findAll()
    .then(students => {
        console.log(students);
    })
    .catch(err => {
        console.error('Error querying Students:', err);
    });