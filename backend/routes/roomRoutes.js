import express from "express";
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
} from "../controller/roomController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
