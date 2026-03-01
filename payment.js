import { startGame } from "./game.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.min.js";

const enterButton = document.getElementById('enterArena');
const feeUSD = 0.10;
const feeETHAddress = "0x039264FdED28cc7f7C21b29Cd6cDbBbeb8a5cc9e";

async function getETHPriceInUSD() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await res.json();
    return data.ethereum.usd;
}

enterButton.onclick = async () => {
    if (!window.ethereum) return alert("Instala MetaMask u otro wallet compatible.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const ethPrice = await getETHPriceInUSD();
    const amount = (feeUSD / ethPrice).toFixed(6);

    try {
        const tx = await signer.sendTransaction({
            to: feeETHAddress,
            value: ethers.parseEther(amount.toString())
        });
        await tx.wait();
        alert("Pago recibido, entrando en la arena...");
        startGame();
    } catch (e) {
        console.error(e);
        alert("Pago fallido o cancelado.");
    }
};