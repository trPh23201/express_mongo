const db = require("../configs/db");
const {
  queryWhere,
  queryLimit,
  queryStartEnd,
  querySort,
} = require("../utils/userQuery");

const userController = {
  //GET /user
  getAllUser(req, res) {
    try {
      res.status(200).json([]);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  //GET /user/:id
  getUserById(req, res) {
    try {
      res.status(200).json({});
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  //POST /user/:id
  deleteUser(req, res) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  //POST /user/:id  +body
  updateUser(req, res) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};

module.exports = userController;
