const express = require('express');


const router = express.Router();
const logController = require('../controllers/queryLogController');

router.get('/', logController.getAllLogs);
module.exports = router;

