// import { Express } from 'express';
// import {initializeApp} from 'firebase/app';
// import {getStorage, ref, getDownloadURL, uploadBytesReumable} from "firebase/storage";
// import multer from 'multer';
// import config from "webpack.config.js"
const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const multer = require("multer");
const app = express();
const port = 8080;

const serviceAccount = require("../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://console.firebase.google.com/project/nodejs1-7a602/firestore/data/~2Fbooks~2F6dxOHHkoQNrem71aZNur",
    storageBucket: "gs://nodejs1-7a602.appspot.com"
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
app.post("/upload", upload.single("image"), async(req, res)=>{
    if(!req.file){
        return res.status(400).send("No file uploaded");
    }

    const metadata = {
        metadata:{
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: req.file.mimetype,
        cacheControl: "public, max-age=3153600"
    };
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: metadata,
            gzip: true
        });
        blobStream.on("error", err=>{
            return res.status(500).json({ error: "Unable to upload"});
        });
        blobStream.on("finish", ()=>{
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            return res.status(201).json({imageUrl});
        });
        blobStream.end(req.file.buffer);
    
});

app.listen(port, () => {
    console.log(`Server is running`)
});