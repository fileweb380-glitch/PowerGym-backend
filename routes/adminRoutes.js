const express = require('express')

const router = express.Router()

const User = require('../Models/User')

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware')

// GET USERS
router.get(

  '/users',

  protect,

  adminOnly,

  async (req, res) => {

    try {

      const users = await User.find()

      res.json(users)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: 'Server Error'
      })

    }

  }

)

// APPROVE PAYMENT
router.put(

  '/payment/:id',

  protect,

  adminOnly,

  async (req, res) => {

    try {

      const user = await User.findById(
        req.params.id
      )

      if (!user) {

        return res.status(404).json({
          message: 'User not found'
        })

      }

      user.paymentStatus = 'Paid'

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

  }

)

module.exports = router