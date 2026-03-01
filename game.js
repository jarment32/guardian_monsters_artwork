// ==========================
// Guardian Monsters Game.js
// ==========================

// --- CONFIGURACIÓN ---
const fid = 208189; // tu FID
let paidArena = false;

// --- CARGA DE SPRITES ---
const uiSprites = {
  arenaButton: "sprites/ui/arena_button.png",
  inventoryButton: "sprites/ui/inventory_button.png",
  statsButton: "sprites/ui/stats_button.png",
  mapButton: "sprites/ui/map_button.png",
  fightButton: "sprites/ui/fight_button.png",
};

const monsterSprites = {};
const itemSprites = {};
const statusSprites = {};

// Cargar monstruos
["Monster1.png","Monster2.png","Monster3.png"].forEach(name => {
  monsterSprites[name.split(".")[0]] = `sprites/Monsters/${name}`;
});

// Cargar items
["Sword.png","Shield.png","Potion.png"].forEach(name => {
  itemSprites[name.split(".")[0]] = `sprites/items/${name}`;
});

// Cargar efectos de estado
["Poison.png","Stun.png","Burn.png"].forEach(name => {
  statusSprites[name.split(".")[0]] = `sprites/status_effects/${name}`;
});

// --- BACKDROPS DE BATALLA ---
const battleBackdrops = ["backdrops/Battle/bg1.png","backdrops/Battle/bg2.png"];

// ==========================
// FUNCIONES DE JUEGO
// ==========================

// Verificar si el FID ya pagó la Arena
async function checkArenaFee() {
  try {
    const res = await fetch(`/api/check_fee?fid=${fid}`);
    const data = await res.json();
    paidArena = data.paid;
    console.log("Arena access:", paidArena ? "Unlocked" : "Locked");
  } catch (err) {
    console.error("Error checking fee:", err);
    paidArena = false;
  }
}

// Pagar fee para desbloquear Arena
async function payArenaFee() {
  try {
    // Aquí integrar SDK de Farcaster y wallet
    const res = await fetch(`/api/pay_fee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fid }),
    });
    const data = await res.json();
    if (data.success) {
      paidArena = true;
      alert("Payment successful! Arena unlocked and future airdrop registered.");
    }
  } catch (err) {
    console.error("Error paying fee:", err);
    alert("Payment failed. Try again.");
  }
}

// Entrar al edificio Arena
function enterArena() {
  if (!paidArena) {
    if (confirm("Access to Arena costs $0.10 ETH. Pay now?")) {
      payArenaFee();
    } else {
      alert("You cannot enter the Arena without paying the fee.");
    }
    return;
  }
  loadBattleScene();
}

// Cargar escena de batalla
function loadBattleScene() {
  const bg = battleBackdrops[Math.floor(Math.random() * battleBackdrops.length)];
  document.body.style.backgroundImage = `url('${bg}')`;
  alert("Battle scene loaded!");
}

// ==========================
// UI PRINCIPAL
// ==========================
function createUIButton(name, x, y, onClick) {
  const btn = document.createElement("button");
  btn.style.position = "absolute";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.width = "100px";
  btn.style.height = "50px";
  btn.style.backgroundImage = `url('${uiSprites[name]}')`;
  btn.style.backgroundSize = "cover";
  btn.onclick = onClick;
  document.body.appendChild(btn);
  return btn;
}

// Crear botones UI
createUIButton("arenaButton", 50, 400, enterArena);
createUIButton("inventoryButton", 200, 400, () => alert("Inventory opened"));
createUIButton("statsButton", 350, 400, () => alert("Stats opened"));
createUIButton("mapButton", 500, 400, () => alert("Map opened"));
createUIButton("fightButton", 650, 400, () => alert("Fight triggered"));

// ==========================
// CARGA INICIAL
// ==========================
window.onload = () => {
  checkArenaFee();
  alert("Welcome to Guardian Monsters! Explore the game freely, Arena requires fee to enter.");
};