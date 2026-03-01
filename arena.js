// arena.js
import { sendTransaction, checkPaymentFlag } from "farcaster-sdk"; // ajustar según SDK

const ARENA_FEE_ETH = 0.10;
const FEE_TOKEN_ADDRESS = "0x039264FdED28cc7f7C21b29Cd6cDbBbeb8a5cc9e"; // tu wallet

export async function enterArena(walletAddress) {
  try {
    const alreadyPaid = await checkPaymentFlag(walletAddress, "arenaAccess");
    if (alreadyPaid) {
      console.log("Arena access already granted for this wallet.");
      return true;
    }

    const confirmPayment = confirm(`Pay ${ARENA_FEE_ETH} ETH to enter the Arena and unlock future airdrops?`);
    if (!confirmPayment) return false;

    const tx = await sendTransaction({
      from: walletAddress,
      to: FEE_TOKEN_ADDRESS,
      value: ARENA_FEE_ETH,
      network: "mainnet",
    });

    console.log("Transaction sent:", tx);

    // Set payment flag for future reference (once confirmed on chain)
    await setArenaPaymentFlag(walletAddress);

    return true;
  } catch (err) {
    console.error("Arena entry failed:", err);
    alert("Payment failed or canceled. Cannot enter the Arena.");
    return false;
  }
}

// Mock function, reemplaza con almacenamiento real o smart contract
async function setArenaPaymentFlag(walletAddress) {
  console.log(`Setting arena access flag for ${walletAddress}`);
  // Aquí podrías usar un smart contract o backend para registrar que ya pagó
  return true;
}