import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCmpcIqn6pyG7DLALbOI5GTVTwIjamDDhI",
  authDomain: "facebook-clone-e75ee.firebaseapp.com",
  projectId: "facebook-clone-e75ee",
  storageBucket: "facebook-clone-e75ee.appspot.com",
  messagingSenderId: "932816497921",
  appId: "1:932816497921:web:e873f44311ba9dbaa5bf00"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }