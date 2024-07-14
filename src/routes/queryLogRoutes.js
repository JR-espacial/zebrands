const express = require('express');
const router = express.Router();
const logController = require('../controllers/queryLogController');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth() , logController.getAllLogs);
module.exports = router;

