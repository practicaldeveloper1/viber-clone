import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDIuPf67un02IoM9diFvujXT1g_gfgY6JE",
  authDomain: "pd-viber-18c66.firebaseapp.com",
  projectId: "pd-viber-18c66",
  storageBucket: "pd-viber-18c66.appspot.com",
  messagingSenderId: "745697906589",
  appId: "1:745697906589:web:1edce1cea4aaa3f9d56974"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;