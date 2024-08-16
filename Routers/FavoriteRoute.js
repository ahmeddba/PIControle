const express =require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../Controllers/FavoriteController');
const router = express.Router()


router.get('/getFavorites/:jobSeekerId', getFavorites);
router.post('/addFavorite', addFavorite);
router.delete('/removeFavorite', removeFavorite);


module.exports = router;
