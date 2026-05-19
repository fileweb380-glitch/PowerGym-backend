const express = require('express')

const router = express.Router()

const User = require('../models/User')

// ─────────────────────────────
// GET ALL USERS
// ─────────────────────────────

router.get('/users', async (req, res) => {

  try {

    const users = await User.find()

    res.json(users)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

})

// ─────────────────────────────
// APPROVE PAYMENT
// ─────────────────────────────

router.put('/payment/:id', async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    )

    if (!user) {

      return res.status(404).json({
        message: 'User not found'
      })

    }

    user.paymentStatus = 'Approved'

    await user.save()

    res.json({
      message: 'Payment Approved'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

})

module.exports = router