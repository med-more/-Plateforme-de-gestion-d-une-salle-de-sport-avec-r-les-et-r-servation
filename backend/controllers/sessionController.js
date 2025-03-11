const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const { title, date, time, capacity } = req.body;
    const newSession = new Session({ title, date, time, capacity, coach: req.user.id });

    await newSession.save();
    res.status(201).json({ message: "Session créée avec succès", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la session", error });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("coach", "name");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des sessions", error });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session non trouvée" });

    if (session.coach.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la session", error });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session non trouvée" });

    if (session.coach.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    await session.deleteOne();
    res.status(200).json({ message: "Session supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
