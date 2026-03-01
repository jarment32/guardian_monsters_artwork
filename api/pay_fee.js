// Este endpoint registra que un FID ha pagado el fee
// Se debe llamar desde la app cuando el usuario paga $0.10 ETH en Arena

import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "arena_fee_db.json");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fid } = req.body;

  if (!fid) {
    return res.status(400).json({ error: "FID missing" });
  }

  let db = {};
  if (existsSync(DB_PATH)) {
    db = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  }

  // Registrar pago
  db[fid] = true;
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.status(200).json({ success: true, fid });
}