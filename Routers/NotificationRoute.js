const express=require('express');
const { sendNotification, getNotifications, markAsRead } = require('../Controllers/NotificationsService');
const router = express.Router();


router.post('/sendNotification',sendNotification);
router.get('/getNotifications/:userId',getNotifications);
router.put('/markAsRead/:notificationId',markAsRead);

module.exports = router;
