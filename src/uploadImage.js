const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'); 

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://nodejs1-7a602.appspot.com', 
});

const bucket = admin.storage().bucket();

const app = express();
const port = 3000;

// Set up Multer for file upload
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Endpoint for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = Date.now() + '-' + file.originalname;
  const fileUpload = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', (error) => {
    console.error(error);
    res.status(500).send('Error uploading file.');
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    
    res.status(200).send(`File uploaded successfully. URL: ${publicUrl}`);
  });

  blobStream.end(file.buffer);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
