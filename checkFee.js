// /api/checkFee.js
const paidFIDs = {};

export async function checkFeeServer(fid){
  return paidFIDs[fid] || false;
}

export async function registerFeeServer(fid){
  paidFIDs[fid] = true;
}