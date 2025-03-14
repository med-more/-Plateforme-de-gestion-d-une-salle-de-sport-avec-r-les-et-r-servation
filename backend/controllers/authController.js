const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    user = new User({ firstName, lastName, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      token, 
      user: { 
        id: user._id, // Ensure the user ID is included
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, dateOfBirth, role, oldPassword, newPassword } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.role = role || user.role;

    // Update password if provided
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Ancien mot de passe incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Save the updated user
    await user.save();

    // Return success response
    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil", error });
  }
};