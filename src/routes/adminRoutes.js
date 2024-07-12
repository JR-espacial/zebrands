const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAllAdmins); // Example route

module.exports = router;
