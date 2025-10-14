import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import reservationRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);

// 🧠 Empêche la connexion à la DB pendant les tests
if (process.env.NODE_ENV !== "test") {
    sequelize
        .authenticate()
        .then(() => console.log("✅ Connecté à la base de données"))
        .catch((err) => {
            console.error("❌ Erreur BDD:", err);
            process.exit(1);
        });
}

export default app;
