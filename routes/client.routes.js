const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clients.controller')

//CRUD
router.post('/clients/registration', (req, res) => ClientController.create(req, res));
router.get('/clients', (req, res) => ClientController.getAll(req, res));
router.get('/clients/:id', (req, res) => ClientController.getOne(req, res));
router.put('/clients/:id', (req, res) => ClientController.updateData(req, res));
router.delete('/clients/:id', (req, res) => ClientController.delete(req, res));

//Another routes


module.exports = router;