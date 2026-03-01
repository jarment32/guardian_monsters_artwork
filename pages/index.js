import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Game() {
  const [fid, setFid] = useState(null);
  const [feePaid, setFeePaid] = useState(false);

  useEffect(() => {
    // Integración con Farcaster Frame
    if (window.Farcaster) {
      window.Farcaster.getAccount().then(acc => {
        setFid(acc.fid);
        checkFee(acc.fid);
      });
    }
  }, []);

  const checkFee = async (fid) => {
    const res = await fetch('/api/checkFee?fid=' + fid);
    const data = await res.json();
    setFeePaid(data.paid);
  };

  const payFee = async () => {
    if (!fid) return;
    // Request payment through Farcaster wallet
    const res = await window.Farcaster.request({
      type: 'transaction',
      params: {
        to: '0x039264FdED28cc7f7C21b29Cd6cDbBbeb8a5cc9e',
        value: 0.10, // $0.10 en ETH, calcular el equivalente según red
        currency: 'ETH'
      }
    });
    if (res.success) {
      await fetch('/api/checkFee', {
        method: 'POST',
        body: JSON.stringify({ fid, paid: true }),
      });
      setFeePaid(true);
    }
  };

  return (
    <>
      <Head>
        <title>Guardian Monsters</title>
      </Head>
      <div id="game-container">
        {/* Aquí se carga todo el juego JS */}
        <script src="/game.js"></script>

        {!feePaid && (
          <div id="arena-lock">
            <img src="/sprites/ui/b-attack.png" alt="Arena Locked" />
            <button onClick={payFee}>
              Unlock Arena ($0.10)
            </button>
          </div>
        )}
      </div>
    </>
  );
}