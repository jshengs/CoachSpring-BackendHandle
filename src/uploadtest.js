const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'nodejs1-7a602.appspot.com',
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Your routes will be defined here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/uploadtest.html');
});
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const imageBuffer = req.file.buffer;
    const imageName = req.file.originalname;
    const file = bucket.file(imageName);
    const result = await file.save(imageBuffer, { contentType: 'image/jpeg' });
    console.log('Image uploaded successfully:', result);
    res.redirect('/');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image.');
  }
});

app.get('/images', async (req, res) => {
    try {
      const bucket = admin.storage().bucket();
      const [files] = await bucket.getFiles();
        const imageUrls = files.map(file => {
        const [_, imageName] = file.name.split('/');
        return bucket.file(file.name).getSignedUrl({
          action: 'read',
          expires: '03-09-2023', // Replace with the right expiry date
        }).then(signedUrls => signedUrls[0]);
      });
      const imagesHtml = imageUrls.map(url => `<img src="${url}" />`).join('');
      res.send(imagesHtml);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).send('Error fetching images.');
    }
  });