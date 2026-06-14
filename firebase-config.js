// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDMwOy94UYwJDtXuOS10PEVwqakwvI8_4w",
  authDomain: "numerittos-1d61d.firebaseapp.com",
  projectId: "numerittos-1d61d",
  storageBucket: "numerittos-1d61d.appspot.com",
  messagingSenderId: "1025903060008",
  appId: "1:1025903060008:web:1021395cf3dfaff9b6011d",
  measurementId: "G-WBTQB45HD1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// EXPORTAR FIRESTORE FUNÇÕES
export { collection, addDoc };
