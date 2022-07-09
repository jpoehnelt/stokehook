import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCY4KLsMC-t96SJ35K9PsEqnMN7gpWKPr4",
  authDomain: "stokehook.firebaseapp.com",
  projectId: "stokehook",
  storageBucket: "stokehook.appspot.com",
  messagingSenderId: "3582192981",
  appId: "1:3582192981:web:a6728e84bc0286986bd3dc",
  measurementId: "G-HDZ1Q0NSTL",
};

export const app = initializeApp(firebaseConfig);
