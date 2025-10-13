const API_URL = "http://localhost:3000/api/reservations";

const form = document.getElementById("reservation-form");
const list = document.getElementById("reservations-list");

// 🟢 Charger les réservations existantes
async function loadReservations() {
    try {
        const res = await axios.get(API_URL);
        list.innerHTML = "";

        if (res.data.length === 0) {
            list.innerHTML = "<p>Aucune réservation pour le moment.</p>";
            return;
        }

        res.data.forEach((r) => {
            const div = document.createElement("div");
            div.classList.add("reservation");
            div.innerHTML = `
        <strong>${r.room}</strong> — Utilisateur #${r.user} <br>
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
        list.innerHTML =
            "<p>⚠️ Erreur lors du chargement des réservations.</p>";
    }
}

// 🟡 Soumission du formulaire
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        room: document.getElementById("room").value,
        user: parseInt(document.getElementById("user").value),
        startTime: document.getElementById("startTime").value,
        endTime: document.getElementById("endTime").value,
        comment: document.getElementById("comment").value,
    };

    try {
        await axios.post(API_URL, data);
        alert("✅ Réservation créée avec succès !");
        form.reset();
        loadReservations();
    } catch (err) {
        console.error(err);
        alert("❌ Erreur lors de la création de la réservation.");
    }
});

// 🟣 Charger dès le départ
loadReservations();
