const generateImg = require("./src/index")
const express = require("express");
const fs = require("fs");
const app = express();

const port = 8080; // Specify the port number

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});


app.get("/", async(req, res) => {
    const {name} = req.query;

    if(name === undefined) res.send("name undifined")


    let filename = await generateImg(name)

    let imgBuffer = fs.readFileSync(`./out/${filename}.png`);

    res.send("ök")
});