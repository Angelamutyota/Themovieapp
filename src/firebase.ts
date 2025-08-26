import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwHxYr5qCb7hiqicI0bwNyUZjOfXA6rUQ",
  authDomain: "the-movie-app-bf228.firebaseapp.com",
  projectId: "the-movie-app-bf228",
  storageBucket: "the-movie-app-bf228.firebasestorage.app",
  messagingSenderId: "394992891145",
  appId: "1:394992891145:web:264a13d1544e876690cfd8",
  measurementId: "G-Z3V0W0EKD3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);