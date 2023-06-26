const express = require("express");
const userController = require("../../controllers/user");
const User = require("../../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, age, phone, address, gender } = req.body;
  try {
    const user = await User.create({
      name,
      age,
      phone,
      address,
      gender,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User not found");
    }
    await user.deleteOne();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const { name, age, phone, address, gender } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User not found");
    }
    await user.updateOne({
      name,
      age,
      phone,
      address,
      gender,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
