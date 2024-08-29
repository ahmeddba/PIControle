const express = require('express');
const router = express.Router();
const {register, login, changePassword, getUser, updateSkills} = require('../Controllers/AuthController');
const { isAuth } = require('../Middlewares/isAuth');

router.post('/regist' , register);
router.post('/login' , login);
router.put('/changepwd/:id' , changePassword);
router.put("/skills/:id", updateSkills);
router.get("/:id" , getUser)
router.get('/current',isAuth, (req, res) => {
    res.status(200).send(req.user);
});

module.exports = router;
