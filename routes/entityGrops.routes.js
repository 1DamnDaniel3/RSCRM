const express = require('express');
const router = express.Router();
const entityGroupsController = require('../controllers/entityGroup.controller')

//CRUD
router.post('/entityGroups/registration', (req, res) => entityGroupsController.create(req, res));
router.get('/entityGroups', (req, res) => entityGroupsController.getAll(req, res));
router.get('/entityGroups/:id', (req, res) => entityGroupsController.getOne(req, res));
router.put('/entityGroups/:id', (req, res) => entityGroupsController.update(req, res));
router.delete('/entityGroups/:id', (req, res) => entityGroupsController.delete(req, res));

// Another routes
router.get('/entities-by-group', entityGroupsController.getEntitiesByGroup);
router.post('/entityGroups/groupList', entityGroupsController.getAllGroupsOfEntityByType);


module.exports = router;