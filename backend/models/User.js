const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, "Le prénom est requis"], 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: [true, "Le nom est requis"], 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: [true, "L'email est requis"], 
    match: [/.+\@.+\..+/, "Format d'email invalide"], 
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, "Le mot de passe est requis"], 
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"]
  },
  role: { 
    type: String, 
    enum: ["member", "trainer"], 
    default: "member" 
  }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
