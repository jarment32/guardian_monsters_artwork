// public/game.js

import { loadSprites, loadBackgrounds, createUI, createBattleSystem } from './gameModules.js';

window.onload = async () => {
  const gameContainer = document.getElementById('game-container');

  // --- Cargar Sprites ---
  const uiSprites = await loadSprites('/sprites/ui');
  const itemSprites = await loadSprites('/sprites/items');
  const monsterSprites = await loadSprites('/sprites/Monsters');
  const statusSprites = await loadSprites('/sprites/status effects');
  const battleBackgrounds = await loadBackgrounds('/backdrops/Battle');

  // --- Crear UI ---
  const ui = createUI(gameContainer, uiSprites);

  // --- Sistema de Batalla ---
  const battleSystem = createBattleSystem({
    container: gameContainer,
    monsters: monsterSprites,
    items: itemSprites,
    statusEffects: statusSprites,
    backgrounds: battleBackgrounds,
    ui,
    onArenaAccess: async () => {
      // Verificar si FID ha pagado
      if (!window.fid) return alert('Farcaster account not loaded!');
      const res = await fetch('/api/checkFee?fid=' + window.fid);
      const data = await res.json();
      if (data.paid) {
        alert('Access granted!');
        return true;
      } else {
        alert('Pay $0.10 in ETH to access Arena.');
        return false;
      }
    }
  });

  // --- Integración con Farcaster ---
  if (window.Farcaster) {
    const account = await window.Farcaster.getAccount();
    window.fid = account.fid;
    const feeRes = await fetch('/api/checkFee?fid=' + account.fid);
    const feeData = await feeRes.json();
    battleSystem.setArenaUnlocked(feeData.paid);
  }

  // --- Render Loop ---
  function gameLoop() {
    battleSystem.update();
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
};