const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// ─────────────────────────────
// Middleware
// ─────────────────────────────

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

// ─────────────────────────────
// Routes
// ─────────────────────────────

app.use('/api/auth', require('./routes/auth'))

app.use('/api/user', require('./routes/user'))

app.use('/api/program', require('./routes/program'))

// ✅ FIXED ADMIN ROUTE
app.use('/api/admin', require('./routes/adminRoutes'))

// ─────────────────────────────
// Health Check
// ─────────────────────────────

app.get('/', (req, res) => {

  res.json({
    message: 'PowerGym API is running ✅'
  })

})

// ─────────────────────────────
// MongoDB Connection
// ─────────────────────────────

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log('✅ MongoDB Connected')

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {

    console.log(
      `✅ Server running on http://localhost:${PORT}`
    )

  })

})

.catch((error) => {

  console.log(
    '❌ MongoDB Connection Error:',
    error.message
  )

})