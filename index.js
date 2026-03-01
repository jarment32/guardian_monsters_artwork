import { initFarcaster, checkFee, payFee } from './farcaster.js';
import { worldAssets } from './gameAssets.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let deviceRatio = window.devicePixelRatio || 1;
canvas.width = 640 * deviceRatio;
canvas.height = 960 * deviceRatio; // 2:3 aspect ratio
ctx.scale(deviceRatio, deviceRatio);

let arenaUnlocked = false;
let playerFID = null;

async function initGame() {
  playerFID = await initFarcaster();
  arenaUnlocked = await checkFee(playerFID);
  drawWorld();
  setupInteractions();
}

function drawWorld() {
  // Render the tiles, buildings, sprites
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(worldAssets.background, 0, 0, 640, 960);
  // Example buildings
  ctx.drawImage(worldAssets.building_shop, 100, 700, 120, 120);
  ctx.drawImage(worldAssets.building_arena, 400, 700, 120, 120);

  // Overlay if arena locked
  if(!arenaUnlocked){
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(400,700,120,120);
  }
}

function setupInteractions() {
  canvas.addEventListener('click', async (e) => {
    const x = e.offsetX / deviceRatio;
    const y = e.offsetY / deviceRatio;

    // Arena coordinates
    if(x >= 400 && x <= 520 && y >= 700 && y <= 820) {
      if(!arenaUnlocked){
        const confirmPay = confirm("Arena requires 0.10$ in ETH. Pay now?");
        if(confirmPay){
          arenaUnlocked = await payFee(playerFID);
          drawWorld();
          if(arenaUnlocked) alert("Arena unlocked! You also qualify for future airdrop.");
        }
      } else {
        enterArena();
      }
    }
  });
}

function enterArena() {
  alert("Entering Arena… Fight your guardian!");
  // TODO: arena battle logic
}

initGame();