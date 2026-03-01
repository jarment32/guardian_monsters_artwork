// Este endpoint verifica si un FID ha pagado el fee de Arena
// y devuelve { paid: true/false }

import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "arena_fee_db.json");

export default function handler(req, res) {
  const { fid } = req.query;

  if (!fid) {
    return res.status(400).json({ error: "FID missing" });
  }

  let db = {};
  if (existsSync(DB_PATH)) {
    db = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  }

  const paid = db[fid] === true;

  res.status(200).json({ paid });
}