import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB-QgHUx1IeRG-HPWvEaonttWsvqLuSCgE",
  authDomain: "todo-app-bac46.firebaseapp.com",
  projectId: "todo-app-bac46",
  storageBucket: "todo-app-bac46.appspot.com",
  messagingSenderId: "60819536040",
  appId: "1:60819536040:web:20a21175db9247c125aa9d",
  measurementId: "G-556083Q5K0"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);