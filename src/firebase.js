import {initializeApp} from 'firebase/app'

const{getFirestore} = require("firebase/firestore");
const{
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_pROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
    apiKey: "AIzaSyCK40LBBLYCEyAyAx4IIl0RVjk-fwDzHy8",
    authDomain: "nodejs1-7a602.firebaseapp.com",
    projectId: "nodejs1-7a602",
    storageBucket: "nodejs1-7a602.appspot.com",
    messagingSenderId: "890818005497",
    appId: "1:890818005497:web:0c6b9f874c8fbd1b2dd528",
    measurementId: "G-YRZJV3KGEF"
  };

  //init firebase app
  initializeApp(firebaseConfig);