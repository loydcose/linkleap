import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBbmO8wfUJB7GYIjUadVFc8YsBsPfC8-3w",
  authDomain: "linkleap-84e41.firebaseapp.com",
  projectId: "linkleap-84e41",
  storageBucket: "linkleap-84e41.appspot.com",
  messagingSenderId: "994375945150",
  appId: "1:994375945150:web:a1cbe82598e218074dc7ef",
  measurementId: "G-Z7DFM07SCK",
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

// login system
export const googleProvider = new GoogleAuthProvider()

// for querying data
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
