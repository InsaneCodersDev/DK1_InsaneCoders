import firebase from  'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDu0psXvljZiA_oDYYYac03ogOAkrL2gyY",
    authDomain: "to-do-list-1a014.firebaseapp.com",
    databaseURL: "https://to-do-list-1a014.firebaseio.com",
    projectId: "to-do-list-1a014",
    storageBucket: "to-do-list-1a014.appspot.com",
    messagingSenderId: "559485359472",
    appId: "1:559485359472:web:89266c4ffbbf501760abb5",
    measurementId: "G-QBJ1XT4EGX"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  export default function(){
      return(auth);
  }
