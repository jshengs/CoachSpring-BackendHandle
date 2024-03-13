const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(710, 1064);
const ctx = canvas.getContext("2d");
const fs = require("fs");
let cloudImg, logoImg, tagImg;

async function loadAssets(color) {
  cloudImg = await loadImage("uploads/cloudFinal.jpg");
  logoImg = await loadImage("uploads/logo.png");

  switch (color) {
    case "purpleVideo":
      tagImg = await loadImage("uploads/T_visionary.png");
      break;

    case "denimVideo":
      tagImg = await loadImage("uploads/T_explorer.png");
      break;

    case "blackVideo":
      tagImg = await loadImage("uploads/T_activist.png");
      break;

    case "yellowVideo":
      tagImg = await loadImage("uploads/T_creative.png");
      break;

    case "tyeDyeVideo":
      tagImg = await loadImage("uploads/T_lover.png");
      break;
    default:
      tagImg = await loadImage("uploads/T_creative.png");
  }
}

async function Main(name, color) {
  await loadAssets(color);

  if (cloudImg === undefined || logoImg === undefined || tagImg === undefined) {
    throw new Error("Failed to load images.");
  }

  ctx.drawImage(cloudImg, 0, 0, 710, 1064);

  const logoX = (canvas.width - logoImg.width) / 2;
  ctx.drawImage(logoImg, logoX, 45);

  ctx.drawImage(
    tagImg,
    canvas.width * 0.5 - 675 * 0.8 * 0.5,
    canvas.height * 0.62 - 503 * 0.8 * 0.5,
    675 * 0.8,
    503 * 0.8
  );

  ctx.font = "bold 100px 'Helvetica LT Pro Bold'";
  ctx.fillStyle = "white";

  let fontHeight = 110;
  let base = 270;

  ctx.fillText(name.toUpperCase(), 80, base);
  ctx.font = "bold 100px 'Helvetica LT Pro Bold'";
  ctx.fillText("YOU", 80, base + fontHeight);
  ctx.fillText("ARE A", 80, base + fontHeight * 2);

  return canvas.toBuffer();
}

// async function debug(){
//   let  _ = await Main("MATTHEW" , "black");
//   fs.writeFile("test.png" , _)
// }

// debug()

module.exports = Main;
