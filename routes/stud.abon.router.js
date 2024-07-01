const express = require('express');
const router = express.Router();
const studAbonController = require('../controllers/stud.abon.controller')

//CRUD
router.post('/studentsAbonements/createStudAbon', (req, res) => studAbonController.create(req, res));
router.get('/studentsAbonements', (req, res) => studAbonController.getAll(req, res));
router.get('/studentsAbonements/:id', (req, res) => studAbonController.getOne(req, res));
router.put('/studentsAbonements/:id', (req, res) => studAbonController.update(req, res));
router.delete('/studentsAbonements/:id', (req, res) => studAbonController.delete(req, res));

// Another routes


module.exports = router;