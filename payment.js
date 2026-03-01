import { startGame } from "./game.js";

const enterButton = document.getElementById('enterArena');
const feeUSD = 0.10;
const feeETHAddress = "0x039264FdED28cc7f7C21b29Cd6cDbBbeb8a5cc9e";

async function getETHPriceInUSD() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await res.json();
    return data.ethereum.usd;
}

enterButton.onclick = async () => {
    if (!window.Farcaster) return alert("Abre la app en Farcaster con wallet integrada.");

    const fc = new Farcaster.FarcasterSDK();
    const ethPrice = await getETHPriceInUSD();
    const amountETH = (feeUSD / ethPrice).toFixed(6);

    try {
        const txHash = await fc.wallet.sendTransaction({
            to: feeETHAddress,
            value: amountETH
        });
        console.log("Pago enviado:", txHash);
        alert("Pago recibido, entrando en la arena...");
        startGame();
    } catch (e) {
        console.error(e);
        alert("Pago fallido o cancelado.");
    }
};