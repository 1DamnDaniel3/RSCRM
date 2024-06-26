const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const UserTokensController = require('../controllers/user.tokens.controller');

const UserTokentsController = new UserTokensController

//CRUD
router.post('/users/registration', (req, res) => userController.create(req, res));
router.get('/users', (req, res) => userController.getAll(req, res));
router.get('/users/:id', (req, res) => userController.getOne(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

//ANOTHER ROUTES
router.post('/users/login', (req, res) => userController.userLogin(req, res));// login
router.post('/users/refresh-token', (req, res) => UserTokentsController.refreshToken(req, res));//refresh-token(автоматизировать на фронте)
router.post('/users/change-password', (req, res) => userController.userChangePassword(req, res));

module.exports = router;