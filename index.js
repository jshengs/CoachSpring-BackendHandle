const generateImg = require("./src/index");
const express = require("express");
const fs = require("fs").promises;
const { Storage } = require("@google-cloud/storage");
var cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const port = 1234;

const storage = new Storage({
  projectId: "nodejs1-7a602your-project-id",
  keyFilename: "nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json",
});

const bucketName = "nodejs1-7a602.appspot.com";

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

app.get("/", async (req, res) => {
  const { name, color } = req.query;
  if (name === undefined || color === undefined) {
    res.send("Name and/or Color Undefined");
    return;
  }

  try {
    // const filename = await generateImg(name);
    // const localFilePath = `./out/${filename}.png`;
    // const imgBuffer = await fs.readFile(localFilePath);

    const timestamp = Date.now();
    const filename = `coach-spring-img/${name}_${timestamp}`;
    const imgBuffer = await generateImg(name, color);

    const file = storage.bucket(bucketName).file(`${filename}.png`);
    let ress = await file.save(imgBuffer, {
      metadata: {
        contentType: "image/png",
      },
    });

    //Image save to firebase only
    // const downloadUrl = await getDownloadUrl(filename, timestamp);
    //     console.log("Image URL:", downloadUrl);
    //     res.send("Image URL:" + downloadUrl);

    const downloadUrl = await getDownloadUrl(filename, timestamp);
    // console.log("Image URL:", downloadUrl);
    // const localFilePath = `./out/${filename}.png`; // Specify the local path
    await file.download({
      destination: "test.png",
    });
    // console.log("File downloaded to:", "test.png");

    res.send({
      url: downloadUrl,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Internal Server Error");
  }
});

async function getDownloadUrl(filename, timestamp) {
  const file = storage.bucket(bucketName).file(`${filename}.png`);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: timestamp + 604800000,
  });
  return url;
}
