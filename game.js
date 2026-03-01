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

    // Aquí irá toda la lógica de tu juego usando sprites/, tilesets/, backdrops/, ui/
    ctx.fillStyle = 'white';
    ctx.fillRect(50,50,100,100); // placeholder
}