import firebase from 'firebase'

const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyAbPEsNy8RnjzdHgMZvSemEiypx67lRR7E",
  authDomain: "mr-jaize.firebaseapp.com",
  databaseURL: "https://mr-jaize.firebaseio.com",
  projectId: "mr-jaize",
  storageBucket: "mr-jaize.appspot.com",
  messagingSenderId: "940796553469",
  appId: "1:940796553469:web:e787aee10c5f54e198b694",
  measurementId: "G-WS4795D6S3"
});

 export default firebaseapp.firestore();
