import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

initDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server lancé ${PORT}`));
    })
    .catch((err) => {
        console.error("Erreur BDD:", err);
        process.exit(1);
    });

export default app;
