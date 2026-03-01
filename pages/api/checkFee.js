let paidFids = {}; // Temporal, cambiar a DB en producción

export default function handler(req, res) {
  const { fid } = req.query;
  
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    paidFids[body.fid] = body.paid;
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(200).json({ paid: !!paidFids[fid] });
  }
}