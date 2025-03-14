const Reservation = require("../models/Reservation");
const Session = require("../models/Session");

// POST /api/reservations - Book a session
exports.bookSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Check if the session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    // Check if the session is full
    if (session.participants.length >= session.capacity) {
      return res.status(400).json({ message: "Session complète" });
    }

    // Create a new reservation
    const newReservation = new Reservation({
      user: req.user.id, // Use the authenticated user's ID
      session: sessionId,
    });

    // Add the user to the session's participants list
    session.participants.push(req.user.id);

    // Save the reservation and update the session
    await newReservation.save();
    await session.save();

    // Return success response
    res.status(201).json({
      message: "Réservation réussie",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Erreur lors de la réservation:", error);
    res.status(500).json({ message: "Erreur lors de la réservation", error });
  }
};

// DELETE /api/reservations/:id - Cancel a reservation
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params; // Reservation ID or Session ID (depending on your logic)

    // Find and delete the reservation
    const reservation = await Reservation.findOneAndDelete({
      user: req.user.id, // Ensure the reservation belongs to the authenticated user
      session: id, // Match the session ID
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // Remove the user from the session's participants list
    await Session.findByIdAndUpdate(id, {
      $pull: { participants: req.user.id },
    });

    // Return success response
    res.status(200).json({ message: "Réservation annulée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'annulation:", error);
    res.status(500).json({ message: "Erreur lors de l'annulation", error });
  }
};

// GET /api/reservations/:userId - Get reservations for a user
exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the route parameter

    // Fetch reservations for the user and populate the session details
    const reservations = await Reservation.find({ user: userId }).populate(
      "session"
    );

    // Return the reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des réservations", error });
  }
};