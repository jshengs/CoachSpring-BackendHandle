const generateImg = require("./src/index");
const express = require("express");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const app = express();
const port = 1234; 

const storage = new Storage({
  projectId: "nodejs1-7a602your-project-id",
  keyFilename: "nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json",
});

const bucketName = "gs://nodejs1-7a602.appspot.com";

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

app.get("/", async (req, res) => {
  const { name } = req.query;

  if (name === undefined) res.send("Name Undefined");

  let filename = await generateImg(name);

  let imgBuffer = fs.readFileSync(`./out/${filename}.png`);

  const file = storage.bucket(bucketName).file(`${filename}.png`);
  const stream = file.createWriteStream({
    metadata: {
      contentType: "image/png",
    },
  });

  stream.on("error", (err) => {
    console.error("Error uploading to Firebase Storage:", err);
    res.status(500).send("Error uploading to Firebase Storage");
  });

    stream.on("finish", async () => {
    
    const downloadUrl = await getDownloadUrl(filename);
    console.log("Image URL:", downloadUrl);
    res.send("Image URL:" + downloadUrl);
  });

  stream.end(imgBuffer);

});

async function getDownloadUrl(filename) {
  const file = storage.bucket(bucketName).file(`${filename}.png`);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 604800000,
  });
  return url;
}