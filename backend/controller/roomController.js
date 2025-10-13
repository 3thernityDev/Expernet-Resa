import Reservation from "../models/roomModel.js";

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
    try {
        const { room, user, startTime, endTime, comment } = req.body;

        if (!room || !user || !startTime || !endTime) {
            return res
                .status(400)
                .json({ message: "Champs obligatoires manquants" });
        }

        const reservation = await Reservation.create({
            room,
            user,
            startTime,
            endTime,
            comment,
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error("Erreur création réservation:", error);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
};

// Récupérer toutes les réservations
export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
};

// Récupérer une réservation par ID
export const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }

        res.json(reservation);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
};

// Mettre à jour une réservation
export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { room, startTime, endTime, status, comment } = req.body;

        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }

        await reservation.update({ room, startTime, endTime, status, comment });

        res.json({ message: "Réservation mise à jour", reservation });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
};

// Supprimer une réservation
export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }

        await reservation.destroy();
        res.json({ message: "Réservation supprimée" });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
};
