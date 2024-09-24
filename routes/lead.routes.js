const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller')

//CRUD
router.post('/leads/registration', (req, res) => leadsController.create(req, res));
router.get('/leads', (req, res) => leadsController.getAll(req, res));
router.get('/leads/:id', (req, res) => leadsController.getOne(req, res));
router.put('/leads/:id', (req, res) => leadsController.updateData(req, res));
router.delete('/leads/:id', (req, res) => leadsController.delete(req, res));

// Another routes
router.post('/leads/getStudents', (req, res) => leadsController.allStudentsOfLead(req, res));

module.exports = router;