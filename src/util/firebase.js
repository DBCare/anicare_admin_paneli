import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8BCJ4nn93DIVrcG6xsfPA0tQb-MLNuyQ",
  authDomain: "anicare-2e66c.firebaseapp.com",
  databaseURL: "https://anicare-2e66c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anicare-2e66c",
  storageBucket: "anicare-2e66c.appspot.com",
  messagingSenderId: "154384049554",
  appId: "1:154384049554:web:47a9ad7de54f34884a0d4b",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
