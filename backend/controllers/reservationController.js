const Reservation = require("../models/Reservation");
const Session = require("../models/Session");

exports.bookSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ message: "Session non trouvée" });

    if (session.participants.length >= session.capacity) {
      return res.status(400).json({ message: "Session complète" });
    }

    const newReservation = new Reservation({ user: req.user.id, session: sessionId });
    session.participants.push(req.user.id);

    await newReservation.save();
    await session.save();

    res.status(201).json({ message: "Réservation réussie", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réservation", error });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({ user: req.user.id, session: req.params.id });

    if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });

    await Session.findByIdAndUpdate(req.params.id, { $pull: { participants: req.user.id } });

    res.status(200).json({ message: "Réservation annulée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'annulation", error });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate("session");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réservations", error });
  }
};
