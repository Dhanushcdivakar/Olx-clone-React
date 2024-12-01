import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDxFPTHTVNR0d73tBse-81Ahge0dytGpy4",
    authDomain: "olxproject-16bbd.firebaseapp.com",
    projectId: "olxproject-16bbd",
    storageBucket: "olxproject-16bbd.appspot.com",
    messagingSenderId: "835842724967",
    appId: "1:835842724967:web:532d087e4bcad28e25f0c2",
    measurementId: "G-25KZSJ39HG"
  };
   export default firebase.initializeApp(firebaseConfig)
  