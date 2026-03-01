export async function loadSprites(path) {
  const res = await fetch(path + '/index.json'); // genera un index.json con nombres de PNG
  const files = await res.json();
  const sprites = {};
  for (const f of files) {
    sprites[f.name] = new Image();
    sprites[f.name].src = path + '/' + f.file;
  }
  return sprites;
}

export async function loadBackgrounds(path) {
  const res = await fetch(path + '/index.json');
  const files = await res.json();
  const backgrounds = {};
  for (const f of files) {
    backgrounds[f.name] = new Image();
    backgrounds[f.name].src = path + '/' + f.file;
  }
  return backgrounds;
}

export function createUI(container, uiSprites) {
  const ui = {};
  for (const name in uiSprites) {
    const img = uiSprites[name];
    img.style.position = 'absolute';
    container.appendChild(img);
    ui[name] = img;
  }
  return ui;
}

export function createBattleSystem({ container, monsters, items, statusEffects, backgrounds, ui, onArenaAccess }) {
  const system = {
    monsters,
    items,
    statusEffects,
    backgrounds,
    ui,
    arenaUnlocked: false,
    setArenaUnlocked(val) { this.arenaUnlocked = val; },
    update() {
      // Dibujar fondo
      const ctx = container.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0,0,container.width, container.height);
      ctx.drawImage(backgrounds['default'],0,0);

      // Dibujar UI
      for (const name in ui) ctx.drawImage(ui[name], 0,0);

      // Dibujar monsters/items/status
      // Aquí se implementa la lógica de juego completa
      // ...
    },
    enterArena: async () => {
      if (this.arenaUnlocked) return true;
      return await onArenaAccess();
    }
  };
  return system;
}