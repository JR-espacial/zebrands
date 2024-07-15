const express = require('express');
const router = express.Router();
const logController = require('../controllers/queryLogController');

const  authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware(), logController.getAllLogs);
module.exports = router;

