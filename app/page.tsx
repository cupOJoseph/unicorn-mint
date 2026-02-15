'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UNICORN_CONTRACT_ADDRESS, UNICORN_ABI } from '../src/contract';

function UnicornPreview({ name, hornLength, isMajestic }: { name: string; hornLength: number; isMajestic: boolean }) {
  const hornScale = Math.min(hornLength / 100, 1);
  const hornH = 30 + hornScale * 90;
  const bodyColor = isMajestic ? '#1a1a2e' : '#f0e6ff';
  const maneColor = isMajestic ? '#c084fc' : '#a855f7';
  const hornColor = isMajestic ? '#fbbf24' : '#e879f9';
  const eyeColor = isMajestic ? '#fbbf24' : '#7c3aed';
  const bgGlow = isMajestic ? 'rgba(168,85,247,0.3)' : 'rgba(249,168,212,0.3)';
  const outlineColor = isMajestic ? '#c084fc' : '#a855f7';

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-3xl p-6 transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${bgGlow} 0%, transparent 70%)` }}
      >
        <svg viewBox="0 0 200 220" width="260" height="286" className="drop-shadow-2xl">
          {/* Sparkles for majestic */}
          {isMajestic && (
            <>
              <circle cx="30" cy="40" r="2" fill="#fbbf24" opacity="0.8"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" /></circle>
              <circle cx="170" cy="30" r="2.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></circle>
              <circle cx="160" cy="80" r="1.5" fill="#c084fc" opacity="0.7"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" /></circle>
              <circle cx="40" cy="90" r="2" fill="#e879f9" opacity="0.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" /></circle>
              <circle cx="100" cy="20" r="1.5" fill="#fbbf24" opacity="0.9"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.3s" repeatCount="indefinite" /></circle>
            </>
          )}

          {/* Body */}
          <ellipse cx="100" cy="150" rx="55" ry="40" fill={bodyColor} stroke={outlineColor} strokeWidth="2" />

          {/* Legs */}
          <rect x="60" y="180" width="12" height="30" rx="6" fill={bodyColor} stroke={outlineColor} strokeWidth="1.5" />
          <rect x="80" y="183" width="12" height="32" rx="6" fill={bodyColor} stroke={outlineColor} strokeWidth="1.5" />
          <rect x="108" y="183" width="12" height="32" rx="6" fill={bodyColor} stroke={outlineColor} strokeWidth="1.5" />
          <rect x="128" y="180" width="12" height="30" rx="6" fill={bodyColor} stroke={outlineColor} strokeWidth="1.5" />

          {/* Hooves */}
          <ellipse cx="66" cy="212" rx="8" ry="4" fill={isMajestic ? '#7c3aed' : '#d8b4fe'} />
          <ellipse cx="86" cy="217" rx="8" ry="4" fill={isMajestic ? '#7c3aed' : '#d8b4fe'} />
          <ellipse cx="114" cy="217" rx="8" ry="4" fill={isMajestic ? '#7c3aed' : '#d8b4fe'} />
          <ellipse cx="134" cy="212" rx="8" ry="4" fill={isMajestic ? '#7c3aed' : '#d8b4fe'} />

          {/* Neck */}
          <path d="M 70 140 Q 60 110 65 90" stroke={outlineColor} strokeWidth="2" fill="none" />
          <ellipse cx="72" cy="115" rx="20" ry="30" fill={bodyColor} stroke={outlineColor} strokeWidth="2" />

          {/* Head */}
          <ellipse cx="60" cy="95" rx="25" ry="20" fill={bodyColor} stroke={outlineColor} strokeWidth="2" />

          {/* Ear */}
          <polygon points="48,78 42,60 55,75" fill={bodyColor} stroke={outlineColor} strokeWidth="1.5" />
          <polygon points="50,78 46,65 55,76" fill={isMajestic ? '#4c1d95' : '#ede9fe'} />

          {/* Eye */}
          <ellipse cx="50" cy="92" rx="5" ry="5.5" fill="white" />
          <ellipse cx="49" cy="92" rx="3" ry="3.5" fill={eyeColor} />
          <circle cx="47.5" cy="90.5" r="1.2" fill="white" />

          {/* Nostril */}
          <circle cx="38" cy="100" r="1.5" fill={outlineColor} opacity="0.5" />

          {/* Mouth - slight smile */}
          <path d="M 38 104 Q 42 107 48 105" stroke={outlineColor} strokeWidth="1" fill="none" opacity="0.5" />

          {/* Mane */}
          <path d={`M 68 75 Q 80 65 75 80 Q 88 70 82 88 Q 92 78 88 95 Q 95 88 90 105`} stroke={maneColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M 75 100 Q 90 95 85 115 Q 95 105 90 125`} stroke={maneColor} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Horn */}
          <polygon
            points={`55,80 65,80 60,${80 - hornH}`}
            fill={`url(#hornGrad)`}
            stroke={isMajestic ? '#fbbf24' : '#d946ef'}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          {/* Horn spiral lines */}
          {Array.from({ length: Math.floor(hornH / 15) }, (_, i) => (
            <line
              key={i}
              x1={57 + (i % 2) * 2}
              y1={78 - i * 15}
              x2={63 - (i % 2) * 2}
              y2={75 - i * 15}
              stroke={isMajestic ? '#fde68a' : '#f0abfc'}
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}

          {/* Horn glow */}
          {hornLength > 500 && (
            <circle cx="60" cy={80 - hornH} r="6" fill={hornColor} opacity="0.4">
              <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Tail */}
          <path d="M 150 135 Q 175 120 170 145 Q 185 130 175 155" stroke={maneColor} strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Crown for majestic */}
          {isMajestic && (
            <g transform={`translate(45, ${72 - hornH * 0.15})`}>
              <polygon points="0,12 3,4 6,10 9,2 12,10 15,4 18,12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
              <circle cx="3" cy="5" r="1" fill="#ef4444" />
              <circle cx="9" cy="3" r="1" fill="#3b82f6" />
              <circle cx="15" cy="5" r="1" fill="#10b981" />
            </g>
          )}

          <defs>
            <linearGradient id="hornGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={isMajestic ? '#7c3aed' : '#e879f9'} />
              <stop offset="100%" stopColor={isMajestic ? '#fbbf24' : '#f9a8d4'} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Name plate */}
      <div className={`mt-2 px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 ${
        isMajestic
          ? 'bg-gradient-to-r from-yellow-400 to-purple-500 text-black'
          : 'bg-white/20 text-white border border-white/30'
      }`}>
        {name || 'Unnamed Unicorn'}
      </div>
      {isMajestic && (
        <span className="text-yellow-300 text-sm mt-1 font-semibold">👑 Majestic</span>
      )}
    </div>
  );
}

export default function Home() {
  const { isConnected } = useAccount();
  const [name, setName] = useState('');
  const [hornLength, setHornLength] = useState<number>(50);
  const [isMajestic, setIsMajestic] = useState(false);
  const [lastMintedTokenId, setLastMintedTokenId] = useState<number | null>(null);

  const { data: currentId } = useReadContract({
    address: UNICORN_CONTRACT_ADDRESS,
    abi: UNICORN_ABI,
    functionName: 'current_id',
  });

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleMint = async () => {
    if (!name.trim()) { alert('Please enter a name for your unicorn!'); return; }
    try {
      writeContract({
        address: UNICORN_CONTRACT_ADDRESS,
        abi: UNICORN_ABI,
        functionName: 'mintNFT',
        args: [BigInt(hornLength), name, isMajestic],
      });
      if (currentId) setLastMintedTokenId(Number(currentId));
    } catch (err) { console.error('Error minting:', err); }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isMajestic
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950'
        : 'bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300'
    }`}>
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          🦄 Unicorn Mint
        </h1>
        <ConnectButton />
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
              <span className="text-white/70 text-lg">Total minted: </span>
              <span className="text-3xl font-bold text-yellow-300">
                {currentId ? Number(currentId) : '0'}
              </span>
            </div>
          </div>

          {isConnected ? (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Preview */}
              <div className="flex justify-center">
                <UnicornPreview name={name} hornLength={hornLength} isMajestic={isMajestic} />
              </div>

              {/* Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  ✨ Design Your Unicorn
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Unicorn Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name your unicorn..."
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Horn Length: <span className="text-yellow-300 font-bold text-lg">{hornLength}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={hornLength}
                      onChange={(e) => setHornLength(Number(e.target.value))}
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #e879f9 0%, #fbbf24 ${hornLength / 10}%, rgba(255,255,255,0.2) ${hornLength / 10}%)`,
                      }}
                    />
                    <div className="flex justify-between text-white/50 text-xs mt-1">
                      <span>Tiny nub</span>
                      <span>Legendary (1000)</span>
                    </div>
                  </div>

                  {/* Majestic toggle */}
                  <button
                    onClick={() => setIsMajestic(!isMajestic)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${
                      isMajestic
                        ? 'bg-gradient-to-r from-yellow-400 to-purple-500 text-black border-yellow-400 shadow-lg shadow-yellow-400/30'
                        : 'bg-white/10 text-white/80 border-white/20 hover:border-purple-400'
                    }`}
                  >
                    {isMajestic ? '👑 MAJESTIC MODE ON' : '✨ Enable Majestic Mode'}
                  </button>

                  <button
                    onClick={handleMint}
                    disabled={isPending || isConfirming || !name.trim()}
                    className={`w-full font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg ${
                      isMajestic
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                    }`}
                  >
                    {isPending && '🔄 Preparing Magic...'}
                    {isConfirming && '⏳ Minting...'}
                    {!isPending && !isConfirming && '🦄 Mint Unicorn NFT'}
                  </button>

                  {error && (
                    <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl">
                      <p className="font-medium">❌ Minting failed</p>
                      <p className="text-sm">{error.message}</p>
                    </div>
                  )}
                  {isSuccess && (
                    <div className="bg-green-500/20 border border-green-400/50 text-green-100 px-4 py-3 rounded-xl">
                      <p className="font-medium">🎉 Unicorn #{lastMintedTokenId} minted!</p>
                      {hash && <p className="text-xs mt-1 break-all opacity-70">tx: {hash}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center max-w-lg mx-auto">
              <div className="text-6xl mb-4">🦄</div>
              <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
              <p className="text-white/70 mb-6">Connect to mint magical unicorn NFTs on Arbitrum</p>
              <ConnectButton />
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6">
        <p className="text-white/40 text-sm">
          Powered by Arbitrum • Contract: 0x0090...86F3
        </p>
      </footer>
    </div>
  );
}
