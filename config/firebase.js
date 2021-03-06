import * as firebase from "firebase";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNrBsPM9vSnPXlORlS2fc-J7S-7UegNz4",
  authDomain: "signallike-fc736.firebaseapp.com",
  projectId: "signallike-fc736",
  storageBucket: "signallike-fc736.appspot.com",
  messagingSenderId: "859861794312",
  appId: "1:859861794312:web:3b094d0ef7523658699bbd",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
