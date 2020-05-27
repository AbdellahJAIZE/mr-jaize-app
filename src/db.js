import firebase from 'firebase'

const firebaseapp = firebase.initializeApp({
  apiKey: "API KEY HERE",
  authDomain: "authDomain HERE",
  databaseURL: "databaseURL HERE",
  projectId: "projectId HERE",
  storageBucket: "storageBucket HERE",
  messagingSenderId: "messagingSenderId HERE",
  appId: "appId HERE",
  measurementId: "measurementId HERE"
});

 export default firebaseapp.firestore();
