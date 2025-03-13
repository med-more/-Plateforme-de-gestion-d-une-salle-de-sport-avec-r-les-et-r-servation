const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Un utilisateur est requis"] 
  },
  session: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Session", 
    required: [true, "Une session est requise"] 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
