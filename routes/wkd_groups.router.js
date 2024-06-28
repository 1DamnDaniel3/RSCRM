const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/wkd_groups.controller')

//CRUD
router.post('/wkdGroups/createWKDG', (req, res) => groupsController.create(req, res));
router.get('/wkdGroups', (req, res) => groupsController.getAll(req, res));
router.get('/wkdGroups/:id', (req, res) => groupsController.getOne(req, res));
router.put('/wkdGroups/:id', (req, res) => groupsController.update(req, res));
router.delete('/wkdGroups/:id', (req, res) => groupsController.delete(req, res));

// Another routes


module.exports = router;