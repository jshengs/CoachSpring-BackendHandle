const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(710, 1064)
const ctx = canvas.getContext('2d')
const fs = require("fs")

async function Main(name){
    let cloudImg = await loadImage('uploads/cloud.png');
    ctx.drawImage(cloudImg , 0, 0,);

    let logoImg = await loadImage('uploads/logo.png');
    ctx.drawImage(logoImg , 230, 15);

    let tagImg = await loadImage('uploads/tag.png');
    ctx.drawImage(tagImg , 0, 440,  710, 523);

    ctx.font = "bold 160px 'Helvetica LT Pro Bold'";
    ctx.fillStyle = "white";

    ctx.fillText(name, 80, 310);
    
    ctx.font = "bold 110px 'Helvetica LT Pro Bold'";
    ctx.fillText('YOU', 80, 440);
    ctx.fillText('ARE A', 80, 550);

    let buffer = canvas.toBuffer();

    let fileName = name + Date.now();
    const filePath = `out/${fileName}.png`;
    
    try {
        fs.writeFileSync(filePath, buffer);
        console.log('PNG file written successfully:', filePath);
        
        return fileName
    } catch (err) {
        console.error('Error writing PNG file:', err);
    }
}

module.exports = Main