const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller')

//CRUD
router.post('/leads/register', (req, res) => leadsController.create(req, res));
router.get('/leads', (req, res) => leadsController.getAll(req, res));
router.get('/leads/:id', (req, res) => leadsController.getOne(req, res));
router.put('/leads/:id', (req, res) => leadsController.update(req, res));
router.delete('/leads/:id', (req, res) => leadsController.delete(req, res));

module.exports = router;