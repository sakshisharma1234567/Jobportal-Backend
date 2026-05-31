const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
exports.getUserById = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.params.id
      );

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};