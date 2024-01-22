// Express and Multer setup
const express = require ("express");
const app = express();
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

//upload using url
const axios = require("axios");

const firebase = require("firebase/app");
const {getStorage, ref, uploadBytes} = require("firebase/storage");


// Firebase Configuration:
//Copy & paste from Firebase
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

app.get("/", (req, res)=>{
    res.send("<h1 style='color:blue'>Upload Image to Firebase Storage</h1>")
});


// Route for handling File Upload: using POST
//Upload One file at once
// app.post("/", upload.single("filename"), (req, res)=> {  //ref = reference, req = request, res = response
   // //upload.single("filename") is a middleware. Note: use "filename" in value
//     const storageRef = ref(storage, req.file.originalname);
//     uploadBytes(storageRef, req.file.buffer).then((snapshot)=>{ //Upload the file
//         console.log("File Uploaded");
//     });
//     console.log(req.file);
// });



// Upload multiple files at once: Use upload.array
app.post("/", upload.array("filename"), async (req, res) => {
    // req.files contains an array of files
    const files = req.files;
  
    // Process each file asynchronously
    try {
      await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, file.originalname);
  
          // Use await to wait for each file to be uploaded
          const snapshot = await uploadBytes(storageRef, file.buffer);
          console.log(`File ${file.originalname} uploaded successfully.`);
        })
      );
      res.status(200).send("Files Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).send("Internal Server Error");
    }
  });





  //upload using url
  // app.post("/uploadUrl", async (req, res) => {
  //   const { url, filename } = req.body;

  //   try {
  //     const response = await axios.get(url, { responseType: 'arraybuffer' });
  //     const buffer = Buffer.from(response.data, 'binary');
  
  //     const storageRef = ref(storage, filename);
  //     const snapshot = await uploadBytes(storageRef, buffer);
  
  //     console.log(`File ${filename} uploaded successfully from URL.`);
  //     res.status(200).send("File Uploaded Successfully from URL");
  //   } catch (error) {
  //     console.error("Error uploading file from URL:", error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // });

//Host to PORT 3000
app.listen(3000);