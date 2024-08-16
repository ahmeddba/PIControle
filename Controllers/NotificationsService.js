const Notification = require('../Models/Notification');

exports.sendNotification = async (req, res) => {
    try {
        const { userId, message } = req.body; // Assuming userId and message are passed in the request body
        const notification = new Notification({ userId, message });
        await notification.save();

        res.status(201).send({ success: { msg: "Notification sent successfully" }, notification });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).send({ success: { msg: "Notifications retrieved successfully" }, notifications });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params; // Assuming notificationId is passed as a URL parameter

        await Notification.findByIdAndUpdate(notificationId, { read: true });

        res.status(200).send({ success: { msg: "Notification marked as read" } });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
