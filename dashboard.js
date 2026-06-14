// dashboard.js

// IMPORTAR FIREBASE A PARTIR DO FICHEIRO CENTRAL
import { app, db } from "./firebase-config.js";

import { 
    collection, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// VERIFICAR SESSÃO
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// MOSTRAR NOME DO UTILIZADOR
document.getElementById("titulo").innerText = "Olá, " + user.nome;

// CARREGAR REGISTOS DO UTILIZADOR
async function carregarRegistos() {
    try {
        const q = query(
            collection(db, "registos"),
            where("uid", "==", user.id)
        );

        const snap = await getDocs(q);

        let html = "";

        snap.forEach(doc => {
            const r = doc.data();
            html += `<p>${r.data} — ${r.valor}</p>`;
        });

        document.getElementById("registos").innerHTML = html;

    } catch (erro) {
        console.error("Erro ao carregar registos:", erro);
        document.getElementById("registos").innerHTML = "Erro ao carregar registos.";
    }
}

carregarRegistos();
