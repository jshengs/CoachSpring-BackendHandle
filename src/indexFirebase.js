const admin = require('firebase-admin');
const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'); 

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




  async function uploadToFirebaseStorage(filename) {
    app.post("/", upload.single("filename"), (req, res)=> {  //ref = reference, req = request, res = response
        //upload.single("filename") is a middleware. Note: use "filename" in value
         const storageRef = ref(storage, req.file.originalname);
         uploadBytes(storageRef, req.file.buffer).then((snapshot)=>{ //Upload the file
             console.log("File Uploaded");
         });
         console.log(req.file);
     });
    try {
        // Read the image file
        let imgBuffer = fs.readFileSync(`./out/${filename}.png`);

        // Specify the destination file path in Firebase Storage
        const storagePath = `images/${filename}.png`; // Adjust the storage path as needed

        // Create a write stream to upload the file
        const blobStream = bucket.file(storagePath).createWriteStream({
            metadata: {
                contentType: 'image/png', // Set the correct content type
            },
        });

        // Handle stream events
        blobStream.on('error', (error) => {
            console.error('Error uploading to Firebase Storage:', error);
            throw error; // Throw the error to handle it in the calling function
        });

        blobStream.on('finish', () => {
            console.log('Image uploaded to Firebase Storage successfully.');
        });

        // Write the image buffer to the stream
        blobStream.end(imgBuffer);

        // Return the public URL of the uploaded image
        return `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Throw the error to handle it in the calling function
    }
}

module.exports = { uploadToFirebaseStorage };
