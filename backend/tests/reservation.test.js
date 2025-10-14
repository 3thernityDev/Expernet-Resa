// 🧪 tests/reservation.test.js
import { jest } from "@jest/globals";
import request from "supertest";

// ⚠️ On mocke le modèle avant d’importer le serveur
jest.unstable_mockModule("../models/roomModel.js", () => ({
    default: {
        findAll: jest.fn(),
        create: jest.fn(),
    },
}));

// Ensuite on importe l'app (après le mock)
const { default: app } = await import("../server.js");
const { default: Reservation } = await import("../models/roomModel.js");

describe("🧪 Tests API /api/reservations", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("GET /api/reservations → 200", async () => {
        Reservation.findAll.mockResolvedValue([
            {
                id: 1,
                room: "Salle A",
                user: "Jean",
                startTime: "2025-10-14T10:00:00Z",
                endTime: "2025-10-14T11:00:00Z",
            },
        ]);

        const res = await request(app).get("/api/reservations");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].room).toBe("Salle A");
    });

    it("POST /api/reservations → 201", async () => {
        const fakeReservation = {
            id: 2,
            room: "Salle B",
            user: "Alice",
            startTime: "2025-10-15T10:00:00Z",
            endTime: "2025-10-15T12:00:00Z",
            comment: "Test mock",
        };

        Reservation.create.mockResolvedValue(fakeReservation);

        const res = await request(app)
            .post("/api/reservations")
            .send(fakeReservation);

        expect(res.statusCode).toBe(201);
        expect(res.body.room).toBe("Salle B");
    });
});
