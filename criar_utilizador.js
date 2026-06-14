// criar_utilizador.js

// IMPORTAR FIREBASE A PARTIR DO FICHEIRO CENTRAL
import { app, db } from "./firebase-config.js";

import { 
    collection, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// GERAR TOKEN SEGURO
function gerarToken() {
    return [...crypto.getRandomValues(new Uint8Array(32))]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// GERAR PIN NUMÉRICO (4 dígitos)
function gerarPIN() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// CRIAR UTILIZADOR
window.criarUtilizador = async function () {
    const nome = document.getElementById("nome").value.trim();
    const resultado = document.getElementById("resultado");
    const linkBox = document.getElementById("link");

    if (nome === "") {
        resultado.innerText = "Preenche o nome.";
        return;
    }

    const token = gerarToken();
    const pin = gerarPIN();

    try {
        // ADICIONAR UTILIZADOR AO FIRESTORE
        await addDoc(collection(db, "users"), {
            nome: nome,
            token: token,
            pin: pin,
            ativo: true
        });

        // MOSTRAR RESULTADO
        resultado.innerHTML = `
            Utilizador criado:<br>
            <b>${nome}</b><br>
            PIN: <b>${pin}</b>
        `;

        // LINK DE ACESSO (FUNCIONA EM GITHUB PAGES)
        const link = `${window.location.origin}${window.location.pathname.replace("criar_utilizador.html", "")}login.html?token=${token}`;

        linkBox.innerHTML = `Link de acesso:<br>${link}`;

    } catch (e) {
        resultado.innerText = "Erro ao criar utilizador.";
        console.error("Erro Firebase:", e);
    }
}
