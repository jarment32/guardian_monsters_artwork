import { checkFeeServer, registerFeeServer } from './checkFee.js';

let fid = null;

export async function initFarcaster(){
  // Init Farcaster SDK
  if(window.FarcasterSDK){
    fid = await window.FarcasterSDK.connect();
    console.log("Connected FID:", fid);
    return fid;
  } else {
    alert("Farcaster SDK not available.");
    return null;
  }
}

export async function checkFee(fid){
  if(!fid) return false;
  const paid = await checkFeeServer(fid);
  return paid;
}

export async function payFee(fid){
  if(!fid) return false;
  // Dummy ETH payment logic (replace with Farcaster SDK payment call)
  try {
    const feePaid = await window.FarcasterSDK.pay({
      to: '0x039264FdED28cc7f7C21b29Cd6cDbBbeb8a5cc9e',
      amountUSD: 0.10
    });
    if(feePaid){
      await registerFeeServer(fid);
      return true;
    }
    return false;
  } catch(e){
    console.error(e);
    return false;
  }
}