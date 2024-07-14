const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, adminController.getAllAdmins);

router.post('/', authMiddleware, adminController.createAdmin); 

module.exports = router;
