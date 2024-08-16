const express = require('express');
const router = express.Router();
const {register, login, changePassword, updateProfile} = require('../Controllers/AuthController')

router.post('/regist' , register);
router.post('/login' , login);
router.put('/changepwd/:id' , changePassword);
router.put("/update/:id", updateProfile);

module.exports = router;
