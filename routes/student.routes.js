const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students.controller')

//CRUD
router.post('/students/registration', (req, res) => studentsController.create(req, res));
router.get('/students', (req, res) => studentsController.getAll(req, res));
router.get('/students/:id', (req, res) => studentsController.getOne(req, res));
router.put('/students/:id', (req, res) => studentsController.update(req, res));
router.delete('/students/:id', (req, res) => studentsController.delete(req, res));

//Another routes
router.post('/students/findLeads', (req, res) => studentsController.findStudentsLeads(req, res));

module.exports = router;