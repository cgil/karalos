import { initializeApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANcmcx72s0GHL-Zb0gIvJMKx6ddZUliyQ",
  authDomain: "karalos.firebaseapp.com",
  projectId: "karalos",
  storageBucket: "karalos.appspot.com",
  messagingSenderId: "680423421068",
  appId: "1:680423421068:web:46b088461aa3bfe1adf7a9",
  measurementId: "G-ZMXCBRBK60",
};

export const init = (): FirebaseApp => {
  return initializeApp(firebaseConfig);
};
