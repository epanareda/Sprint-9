import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8cYi8nnGp96DlCxDvkoeO4u_bn-Rnu8o",
  authDomain: "sprint-9-871a1.firebaseapp.com",
  projectId: "sprint-9-871a1",
  storageBucket: "sprint-9-871a1.appspot.com",
  messagingSenderId: "748958652782",
  appId: "1:748958652782:web:b9cf37dedaea0e46f2c97f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export { auth, db };