// 🔍 Détecte automatiquement si on est sur Railway ou en local
const API_URL = window.location.hostname.includes("railway.app")
    ? "https://backend-production-232a.up.railway.app"
    : "http://localhost:3000";

// Charger les réservations existantes
async function loadReservations() {
    try {
        const res = await axios.get(`${API_URL}/api/reservations`);
        const list = document.getElementById("reservations-list");
        list.innerHTML = "";

        if (res.data.length === 0) {
            list.innerHTML = "<p>Aucune réservation pour le moment.</p>";
            return;
        }

        res.data.forEach((r) => {
            const div = document.createElement("div");
            div.classList.add("reservation");
            div.innerHTML = `
        <strong>${r.room}</strong> — Utilisateur : ${r.user} <br>
        🕒 ${new Date(r.startTime).toLocaleString()} → ${new Date(
                r.endTime
            ).toLocaleString()} <br>
        🗒️ ${r.comment || "Aucun commentaire"} <br>
        🔖 Statut : <em>${r.status}</em>
      `;
            list.appendChild(div);
        });
    } catch (err) {
        console.error("Erreur de chargement :", err);
        document.getElementById("reservations-list").innerHTML =
            "<p>⚠️ Erreur lors du chargement des réservations.</p>";
    }
}

// 🟡 Soumission du formulaire
document
    .getElementById("reservation-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = {
            room: document.getElementById("room").value.trim(),
            user: document.getElementById("user").value.trim(),
            startTime: document.getElementById("startTime").value,
            endTime: document.getElementById("endTime").value,
            comment: document.getElementById("comment").value.trim(),
        };

        try {
            await axios.post(`${API_URL}/api/reservations`, data);
            alert("✅ Réservation créée avec succès !");
            form.reset();
            loadReservations();
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                    "❌ Erreur lors de la création de la réservation."
            );
        }
    });

// 🟣 Charger dès le départ
loadReservations();
