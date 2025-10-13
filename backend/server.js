import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import reservationRoutes from "./routes/roomRoutes.js";

dotenv.config();
const app = express();

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
