var admin = require("firebase-admin");
const uuid = require('uuid-v4');
var serviceAccount = require("../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json");
const express = require('express');
const app = express();
const port = 8080;

//upload with express
const multer = require('multer');
const path = require('path');


app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "nodejs1-7a602.appspot.com" //remove gs://
});

var bucket = admin.storage().bucket();

var filename = "../uploads/test.jpg";

async function uploadFile() {
    const metadata = {
      metadata: {

        // To create a download token.
        firebaseStorageDownloadTokens: uuid()
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

     // Uploads a local file to the bucket
  await bucket.upload(filename, {

    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
  });
console.log(`${filename} uploaded.`);
}
uploadFile().catch(console.error);