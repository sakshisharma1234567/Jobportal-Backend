
const Notification = require("../models/Notification");

exports.getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          userId: req.params.id
        }).sort({
          createdAt: -1
        });

      res.json(notifications);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

exports.markAsRead =
  async (req, res) => {

    try {

      await Notification.updateMany(
        {
          userId: req.params.id,
          isRead: false
        },
        {
          isRead: true
        }
      );

      res.json({
        success: true
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };