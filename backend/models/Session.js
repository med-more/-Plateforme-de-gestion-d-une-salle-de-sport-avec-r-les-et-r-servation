const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Le titre de la session est requis"], 
    trim: true 
  },
  date: { 
    type: Date, 
    required: [true, "La date est requise"], 
    validate: {
      validator: function(value) {
        return value >= new Date();
      },
      message: "La date doit être dans le futur"
    }
  },
  time: { 
    type: String, 
    required: [true, "L'heure est requise"], 
    match: [/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Format d'heure invalide (HH:mm)"]
  },
  capacity: { 
    type: Number, 
    required: [true, "La capacité est requise"], 
    min: [1, "La capacité doit être d'au moins 1 participant"]
  },
  coach: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Un coach est requis"]
  },
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }]
});

module.exports = mongoose.model("Session", sessionSchema);
