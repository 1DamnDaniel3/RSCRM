const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller')

//CRUD
router.post('/payment/registration', (req, res) => paymentController.create(req, res));
router.get('/payment', (req, res) => paymentController.getAll(req, res));
router.get('/payment/:id', (req, res) => paymentController.getOne(req, res));
router.put('/payment/:id', (req, res) => paymentController.updateData(req, res));
router.delete('/payment/:id', (req, res) => paymentController.delete(req, res));

// Another routes
router.post('/payment/getMontlyPayment', (req, res) => paymentController.monthlyPayment(req, res));
router.post('/payment/BETApaymentMonthly', (req, res) => paymentController.monthlyPaymentBETA(req, res));


module.exports = router;