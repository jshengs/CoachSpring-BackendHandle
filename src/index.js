const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(710, 1064);
const ctx = canvas.getContext('2d');

let cloudImg, logoImg, tagImg;

async function loadAssets(color) {
  cloudImg = await loadImage('uploads/cloud.png');
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
  ctx.drawImage(logoImg, 230, 15);
  ctx.drawImage(tagImg, 0, 440, 710, 523);

  ctx.font = "bold 160px 'Helvetica LT Pro Bold'";
  ctx.fillStyle = 'white';
  ctx.fillText(name, 75, 280);

  ctx.font = "bold 100px 'Helvetica LT Pro Bold'";
  ctx.fillText('YOU', 75, 420);
  ctx.fillText('ARE A', 75, 520);

  return canvas.toBuffer();
}

module.exports = Main;