const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups.controller')

//CRUD
router.post('/groups/createGroup', (req, res) => groupsController.create(req, res));
router.get('/groups', (req, res) => groupsController.getAll(req, res));
router.get('/groups/:id', (req, res) => groupsController.getOne(req, res));
router.put('/groups/:id', (req, res) => groupsController.update(req, res));
router.delete('/groups/:id', (req, res) => groupsController.delete(req, res));

// Another routes


module.exports = router;