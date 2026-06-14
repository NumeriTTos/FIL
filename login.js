// login.js

// IMPORTAR FIREBASE A PARTIR DO FICHEIRO CENTRAL
import { app, db } from "./firebase-config.js";

import { 
    collection, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LER TOKEN DA URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

let utilizador = null;

// PROCURAR UTILIZADOR PELO TOKEN
async function obterUtilizadorPorToken(token) {
    const q = query(collection(db, "users"), where("token", "==", token));
    const snap = await getDocs(q);

    if (snap.empty) return null;

    return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// INICIAR LOGIN
async function iniciar() {
    utilizador = await obterUtilizadorPorToken(token);

    if (!utilizador) {
        document.getElementById("erro").innerText = "Link inválido";
        return;
    }
}

iniciar();

// VALIDAR PIN
window.confirmarPIN = function () {
    const pinDigitado = document.getElementById("pin").value;

    if (!utilizador) {
        document.getElementById("erro").innerText = "Erro: utilizador não carregado";
        return;
    }

    if (pinDigitado === utilizador.pin) {
        localStorage.setItem("user", JSON.stringify(utilizador));
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("erro").innerText = "PIN incorreto";
    }
}
