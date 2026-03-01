// app.js
import { connectWallet, getWalletAddress } from "farcaster-sdk"; // ajusta según tu SDK
import { enterArena } from "./arena.js";

// Global state
window.gameState = {
  walletConnected: false,
  walletAddress: null,
  arenaAccess: false,
};

// Init game
async function initGame() {
  console.log("Initializing Guardian Monsters Arena...");

  try {
    const wallet = await connectWallet();
    window.gameState.walletConnected = true;
    window.gameState.walletAddress = await getWalletAddress();

    console.log("Wallet connected:", window.gameState.walletAddress);

    // Load main game
    loadMainGame();
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Wallet connection required to access the Arena.");
  }
}

function loadMainGame() {
  // Tu juego principal, usando assets y sprites
  console.log("Loading game world...");

  // Ejemplo: botón de Arena
  const arenaButton = document.createElement("button");
  arenaButton.innerText = "Enter Arena";
  arenaButton.onclick = () => {
    if (!window.gameState.walletConnected) {
      alert("Connect your wallet first!");
      return;
    }
    enterArena(window.gameState.walletAddress).then(accessGranted => {
      if (accessGranted) {
        alert("Arena unlocked! Enjoy your battles.");
        window.gameState.arenaAccess = true;
      }
    });
  };
  document.body.appendChild(arenaButton);
}

// Start
window.addEventListener("load", initGame);