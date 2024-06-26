const express = require('express');
const router = express.Router();
const abonementsController = require('../controllers/abon.controller')

//CRUD
router.post('/abonements/createAbonement', (req, res) => abonementsController.create(req, res));
router.get('/abonements', (req, res) => abonementsController.getAll(req, res));
router.get('/abonements/:id', (req, res) => abonementsController.getOne(req, res));
router.put('/abonements/:id', (req, res) => abonementsController.update(req, res));
router.delete('/abonements/:id', (req, res) => abonementsController.delete(req, res));

// Another routes


module.exports = router;