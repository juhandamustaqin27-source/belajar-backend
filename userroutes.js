const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usercontrollers'); // Menggunakan "s" agar seragam dengan variabel produk Anda kemarin

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);

module.exports = router;
