const express  = require('express')
const router   = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const User     = require('../Models/User')

// ════════════════════════════════════
// GET /api/user/me  — get logged-in user profile
// ════════════════════════════════════
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ════════════════════════════════════
// PUT /api/user/me  — update profile
// ════════════════════════════════════
router.put('/me', protect, async (req, res) => {
  try {
    const { firstName, lastName, age, phone, weight, height, goal } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, age, phone, weight, height, goal },
      { new: true, runValidators: true }
    ).select('-password')
    res.json({ message: 'Profile updated!', user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router