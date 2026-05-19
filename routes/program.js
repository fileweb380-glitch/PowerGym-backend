const express       = require('express')
const router        = express.Router()
const protect       = require('../middleware/authMiddleware')
const WeeklyProgram = require('../models/WeeklyProgram')

// ════════════════════════════════════
// GET /api/program  — get user's weekly program
// ════════════════════════════════════
router.get('/', protect, async (req, res) => {
  try {
    const program = await WeeklyProgram.findOne({ user: req.user._id })
    if (!program) {
      return res.status(404).json({ message: 'No program found.' })
    }
    res.json(program)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ════════════════════════════════════
// POST /api/program  — create or update weekly program
// ════════════════════════════════════
router.post('/', protect, async (req, res) => {
  try {
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, notes } = req.body

    // findOneAndUpdate with upsert: creates if not exists, updates if exists
    const program = await WeeklyProgram.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, notes },
      { new: true, upsert: true, runValidators: true }
    )

    res.status(200).json({ message: 'Weekly program saved!', program })
  } catch (err) {
    console.error('Program save error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// ════════════════════════════════════
// DELETE /api/program  — delete weekly program
// ════════════════════════════════════
router.delete('/', protect, async (req, res) => {
  try {
    await WeeklyProgram.findOneAndDelete({ user: req.user._id })
    res.json({ message: 'Program deleted.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router