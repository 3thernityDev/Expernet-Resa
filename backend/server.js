import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { initDB } from "./config/db.js";
import reservationRoutes from "./routes/roomRoutes.js";
import client from "prom-client";

dotenv.config();

const app = express();

// Setup CORS
app.use(
    cors({
        origin: [
            "https://frontend-production-8714.up.railway.app",
            "http://localhost:8080",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Prometheus metrics setup
client.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_ms",
    help: "Durée des requêtes HTTP en ms",
    labelNames: ["method", "route", "code"],
    buckets: [50, 100, 200, 300, 400, 500, 1000],
});

// Middleware pour mesurer la durée des requêtes
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on("finish", () => {
        end({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode,
        });
    });
    next();
});

// Route métriques Prometheus
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.use("/api/reservations", reservationRoutes);

// Empêche la connexion à la DB pendant les tests
if (process.env.NODE_ENV !== "test") {
    sequelize
        .authenticate()
        .then(() => console.log("✅ Connecté à la base de données"))
        .catch((err) => {
            console.error("❌ Erreur BDD:", err);
            process.exit(1);
        });
    initDB();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur le port ${PORT}`);
});

export default app;
