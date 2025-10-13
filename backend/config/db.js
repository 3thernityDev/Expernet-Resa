import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_PORT = 3306,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    NODE_ENV = "development",
} = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: "mariadb",
    logging: NODE_ENV === "development" ? console.log : false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export async function initDB() {
    try {
        console.log("🔄 Synchronisation de la base de données...");
        // Importer les modèles ici
        await import("../models/roomModel.js");
        await sequelize.sync({ alter: true });
        console.log("✅ Base de données synchronisée avec succès !");
    } catch (error) {
        console.error("❌ Erreur de synchronisation :", error);
        throw error;
    }
}

export default sequelize;
