// routes.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const authController = require("../controller/authController");

// Create a new transaction
router.post('/transactions', authController.protect , transactionController.createTransaction);

// Get transaction details by ID
router.get('/transactions/:tokenId', authController.protect , transactionController.getTransactionById);

module.exports = router;
