const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  // Your existing fields...
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  priority: String,
  status: { 
    type: String, 
    enum: ['pending', 'responding', 'completed'], 
    default: 'pending' 
  },
  latitude: Number,
  longitude: Number,
  description: String,
  
  // ADD THESE NEW FIELDS:
  responder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  responded_at: { type: Date, default: null },
  completed_at: { type: Date, default: null },
  
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
