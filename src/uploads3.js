const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'); 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json",
    storageBucket: "nodejs1-7a602.appspot.com"
});

const bucket = admin.storage().bucket();


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

app.post("/upload", upload.single("image"), async(req, res) =>{
    if(!req.file){
        return res.status(400).send("No file");
    }
    
    const metadata ={
        metadata:{
        firebaseStorageDownloadTokens: uuid()
    },
    contentType: req.file.mimetype,
    cacheControl: "public, max-age=31536000"
};

const blob = bucket.file(req.file.originalname);
const blobStream = blob.createWriteStream({
    metadata: metadata,
    gzip: true
});

blobStream.on("finish", ()=>{
    const imageUrl = `https://storage.googleapis.com/${bucket.name}`;
    return res.status(201).json({imageUrl});
});

blobStream.end(req.file.buffer);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${p}`)
})
