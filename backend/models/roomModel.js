import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Reservation = sequelize.define(
    "Reservation",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStart(value) {
                    if (value <= this.startTime) {
                        throw new Error(
                            "La date de fin de reservation doit être après celle de début réservation"
                        );
                    }
                },
            },
        },
        status: {
            type: DataTypes.ENUM("en attente", "confirmé", "annulé"),
            allowNull: false,
            defaultValue: "en attente",
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "reservations",
        timestamps: true,
    }
);

export default Reservation;
