const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      age,
      height,
      weight,
      goal,
      paymentMethod,
      transactionId
    } = req.body

    const existingUser = await User.findOne({
      email
    })

    if (existingUser) {

      return res.status(400).json({
        message: 'User Already Exists'
      })

    }

    if (paymentMethod === 'telebirr') {

      if (
        !transactionId ||
        transactionId.length < 5
      ) {

        return res.status(400).json({
          message: 'Invalid Transaction ID'
        })

      }

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    let paymentStatus = 'Pending'

    if (paymentMethod === 'telebirr') {
      paymentStatus = 'Completed'
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      age,
      height,
      weight,
      goal,
      paymentMethod,
      transactionId,
      paymentStatus
    })

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.status(201).json({
      message: 'Registration Successful',
      token,
      user
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    const user = await User.findOne({
      email
    })

    if (!user) {

      return res.status(400).json({
        message: 'User Not Found'
      })

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid Password'
      })

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.status(200).json({
      message: 'Login Successful',
      token,
      user
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {
  registerUser,
  loginUser
}