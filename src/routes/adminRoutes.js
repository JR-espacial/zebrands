const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware(), adminController.getAllAdmins);

router.post('/', authMiddleware(), adminController.createAdmin); 

router.get('/:id', authMiddleware(), adminController.getAdminById);

router.put('/:id', authMiddleware(), adminController.updateAdmin);

router.delete('/:id', authMiddleware(), adminController.deleteAdmin);

module.exports = router;
