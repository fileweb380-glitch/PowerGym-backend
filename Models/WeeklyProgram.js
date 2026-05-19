const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema({
  exercise: { type: String, default: 'Rest Day' },
  sets:     { type: Number, default: 0 },
  reps:     { type: Number, default: 0 },
  duration: { type: Number, default: 0 },  // in minutes
  notes:    { type: String, default: '' },
}, { _id: false })

const WeeklyProgramSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    Monday:    DaySchema,
    Tuesday:   DaySchema,
    Wednesday: DaySchema,
    Thursday:  DaySchema,
    Friday:    DaySchema,
    Saturday:  DaySchema,
    Sunday:    DaySchema,
    notes:     { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('WeeklyProgram', WeeklyProgramSchema)