const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(710, 1064);
const ctx = canvas.getContext('2d');
const fs = require("fs")
let cloudImg, logoImg, tagImg;

async function loadAssets(color) {
  cloudImg = await loadImage('uploads/cloudFinal.jpg');
  logoImg = await loadImage('uploads/logo.png');

  switch (color) {
    case "purple":
      tagImg = await loadImage('uploads/01_visionary.png');
      break;

    case "brown":
      tagImg = await loadImage('uploads/02_explorer.png');
      break;

    case "black":
      tagImg = await loadImage('uploads/03_activist.png');
      break;

    case "yellow":
      tagImg = await loadImage('uploads/04_creative.png');
      break;
      
    case "grey":
      tagImg = await loadImage('uploads/05_lover.png');
      break;
    default:
      tagImg = await loadImage('uploads/04_creative.png');
  }
}

async function Main(name, color) {
  await loadAssets(color);

  if (cloudImg === undefined || logoImg === undefined || tagImg === undefined) {
    throw new Error('Failed to load images.');
  }

  ctx.drawImage(cloudImg, 0, 0);
  ctx.drawImage(logoImg, 225, 25);
  ctx.drawImage(tagImg, canvas.width * 0.5 -710 * 0.8 * 0.5 , canvas.height * 0.7 -523 * 0.8 * 0.5, 710 * 0.8, 523 * 0.8);

  ctx.font = "bold 115px 'Helvetica LT Pro Bold'";
  ctx.fillStyle = 'white';
  ctx.fillText(name, 30, 260);

  ctx.font = "bold 115px 'Helvetica LT Pro Bold'";
  ctx.fillText('YOU', 30, 390);
  ctx.fillText('ARE A', 30, 520);

  return canvas.toBuffer();
}

// async function debug(){
//   let  _ = await Main("MATTHEW" , "black");
//   fs.writeFile("test.png" , _)
// }

// debug()

module.exports = Main;