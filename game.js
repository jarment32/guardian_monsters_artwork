import { FarcasterWallet } from 'https://cdn.jsdelivr.net/npm/farcaster-sdk@latest/dist/farcaster-sdk.min.js';

const container = document.getElementById('game-container');

let playerPaidArena = false;
let playerFID = null;

async function initGame() {
  // Inicializa la wallet de Farcaster
  const wallet = new FarcasterWallet();
  const account = await wallet.connect();
  playerFID = account.fid;

  // Comprobar si ya pagó la Arena
  playerPaidArena = await checkArenaFee(playerFID);

  // Inicializa la UI del juego
  initUI();
  loadWorld();
}

function initUI() {
  // Crear canvas del juego
  const canvas = document.createElement('canvas');
  canvas.id = 'gameCanvas';
  canvas.width = 960;
  canvas.height = 1440; // relación 2:3
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Cargar botones
  const buttonImages = {};
  const buttons = ['b-attack', 'b-fight', 'b-flee', 'button-a', 'button-b', 'button-use', 'button-learn'];
  buttons.forEach(name => {
    buttonImages[name] = new Image();
    buttonImages[name].src = `sprites/ui/${name}.png`;
  });

  // Dibuja botones y canvas interactivo
  function drawButtons() {
    let x = 20, y = 1280;
    buttons.forEach(btn => {
      ctx.drawImage(buttonImages[btn], x, y);
      x += 120;
    });
  }

  drawButtons();
}

// Cargar tiles y sprites
function loadWorld() {
  const worldImg = new Image();
  worldImg.src = 'tilesets/limbusdev_world2.png';
  worldImg.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(worldImg, 0, 0, canvas.width, canvas.height);
  };
}

// Simulación del pago de la Arena
async function checkArenaFee(fid) {
  // Aquí se conectaría al backend/Farcaster para verificar si el FID pagó
  // Placeholder: retorna falso por defecto
  return false;
}

// Ejecutar juego
initGame();