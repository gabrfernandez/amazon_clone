import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBKbPIE8x-ZRyO1tbCPhcoFa0BGoKy1k6s",
    authDomain: "clone-9c671.firebaseapp.com",
    databaseURL: "https://clone-9c671.firebaseio.com",
    projectId: "clone-9c671",
    storageBucket: "clone-9c671.appspot.com",
    messagingSenderId: "1026549749818",
    appId: "1:1026549749818:web:67d3c202c90c7723e1bd03"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db, auth};