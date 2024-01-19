const express = require ("express");
const app = express();
const multer = require("multer");
const firebase = require("firebase/app");
const {getStorage, ref, uploadBytes} = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCK40LBBLYCEyAyAx4IIl0RVjk-fwDzHy8",
    authDomain: "nodejs1-7a602.firebaseapp.com",
    projectId: "nodejs1-7a602",
    storageBucket: "nodejs1-7a602.appspot.com",
    messagingSenderId: "890818005497",
    appId: "1:890818005497:web:0c6b9f874c8fbd1b2dd528",
    measurementId: "G-YRZJV3KGEF"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = getStorage();

  const upload = multer({storage: multer.memoryStorage()});

app.get("/", (req, res)=>{
    res.send("Firebase Storage")
});

app.post("/", upload.single("filename"), (req, res)=> {
    const storageRef = ref(storage, req.file.originalname);
    uploadBytes(storageRef, req.file.buffer).then((snapshot)=>{
        console.log("File Uploaded");
    });
    console.log(req.file);
});

app.listen(3000);