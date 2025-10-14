import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB } from "./config/db.js";
import reservationRoutes from "./routes/roomRoutes.js";

dotenv.config();
const app = express();

// Autoriser CORS depuis le frontend local
app.use(
    cors({
        origin: "http://localhost:8080",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

app.use(express.json());
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 3000;

initDB()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`🚀 Serveur lancé sur le port ${PORT}`)
        );
    })
    .catch((err) => {
        console.error("❌ Erreur BDD:", err);
        process.exit(1);
    });

export default app;
