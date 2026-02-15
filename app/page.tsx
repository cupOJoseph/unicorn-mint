'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UNICORN_CONTRACT_ADDRESS, UNICORN_ABI } from '../src/contract';

export default function Home() {
  const { isConnected } = useAccount();
  const [name, setName] = useState('');
  const [hornLength, setHornLength] = useState<number>(1);
  const [isMajestic, setIsMajestic] = useState(false);
  const [lastMintedTokenId, setLastMintedTokenId] = useState<number | null>(null);

  // Read total minted unicorns
  const { data: currentId } = useReadContract({
    address: UNICORN_CONTRACT_ADDRESS,
    abi: UNICORN_ABI,
    functionName: 'current_id',
  });

  // Mint NFT hook
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your unicorn!');
      return;
    }
    
    try {
      writeContract({
        address: UNICORN_CONTRACT_ADDRESS,
        abi: UNICORN_ABI,
        functionName: 'mintNFT',
        args: [BigInt(hornLength), name, isMajestic],
      });
      
      if (currentId) {
        setLastMintedTokenId(Number(currentId));
      }
    } catch (err) {
      console.error('Error minting:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold text-white flex items-center gap-2">
          🦄 Unicorn Mint
        </h1>
        <ConnectButton />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Stats */}
          <div className="text-center mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-2">🌟 Magical Statistics</h2>
              <p className="text-3xl font-bold text-yellow-300">
                {currentId ? Number(currentId) : '0'} Unicorns Minted
              </p>
            </div>
          </div>

          {/* Minting Form */}
          {isConnected ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                ✨ Create Your Unicorn ✨
              </h2>
              
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-white text-lg font-medium mb-2">
                    🦄 Unicorn Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your unicorn's magical name..."
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  />
                </div>

                {/* Horn Length */}
                <div>
                  <label className="block text-white text-lg font-medium mb-2">
                    🌟 Horn Length: {hornLength}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={hornLength}
                    onChange={(e) => setHornLength(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-white/70 text-sm mt-1">
                    <span>Tiny</span>
                    <span>Legendary</span>
                  </div>
                </div>

                {/* Majestic Toggle */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMajestic}
                      onChange={(e) => setIsMajestic(e.target.checked)}
                      className="w-5 h-5 rounded border-white/30 text-pink-400 focus:ring-pink-400 focus:ring-2"
                    />
                    <span className="text-white text-lg">
                      👑 Make it Majestic (Extra magical!)
                    </span>
                  </label>
                </div>

                {/* Mint Button */}
                <button
                  onClick={handleMint}
                  disabled={isPending || isConfirming || !name.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isPending && '🔄 Preparing Magic...'}
                  {isConfirming && '⏳ Minting Your Unicorn...'}
                  {!isPending && !isConfirming && '🦄 Mint Unicorn NFT'}
                </button>

                {/* Transaction Status */}
                {error && (
                  <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl">
                    <p className="font-medium">❌ Minting failed:</p>
                    <p className="text-sm">{error.message}</p>
                  </div>
                )}

                {isSuccess && lastMintedTokenId && (
                  <div className="bg-green-500/20 border border-green-400/50 text-green-100 px-4 py-3 rounded-xl">
                    <p className="font-medium">🎉 Success!</p>
                    <p className="text-sm">Your unicorn #{lastMintedTokenId} has been minted!</p>
                    {hash && (
                      <p className="text-xs mt-1 break-all">
                        Transaction: {hash}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">🔐 Connect Your Wallet</h2>
              <p className="text-white/80 mb-6">
                Connect your wallet to start minting magical unicorn NFTs!
              </p>
              <ConnectButton />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8">
        <p className="text-white/60">
          Built with ❤️ for the magic of unicorns • Powered by Arbitrum
        </p>
      </footer>
    </div>
  );
}
