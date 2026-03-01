export let inBattle = false;

export function startGame() {
    document.getElementById('enterArena').style.display = 'none';

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
    }
    window.addEventListener('resize', resize);
    resize();

    // TODO: aquí va toda la lógica de tu juego usando los assets en sprites/, tilesets/, backdrops/
    ctx.fillStyle = 'white';
    ctx.fillRect(50,50,100,100); // ejemplo temporal
}