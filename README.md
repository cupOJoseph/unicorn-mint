# 🦄 Unicorn Mint

A magical NFT minting application built with Next.js for creating unique Unicorn NFTs on Arbitrum One.

## ✨ Features

- **Wallet Connection**: Connect with Rabby or any injected wallet using RainbowKit
- **NFT Minting**: Create custom unicorns with:
  - Custom names
  - Horn length (1-10)
  - Majestic status toggle
- **Real-time Stats**: View total unicorns minted
- **Mobile Responsive**: Beautiful gradient UI that works on all devices
- **Transaction Tracking**: Real-time status updates during minting

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **wagmi v2** for Ethereum interactions
- **viem** for Ethereum utilities
- **RainbowKit** for wallet connection
- **React Query** for state management

## 🚀 Contract Details

- **Chain**: Arbitrum One (Chain ID: 42161)
- **Contract Address**: `0x0090d53817C85F6BcdCE57E78E857d80A9F586F3`

### Contract Functions

- `mintNFT(uint256 _hornL, string _name, bool _magestic)` - Mint a new unicorn
- `current_id()` - Get the next token ID
- `tokenURI(uint256 _id)` - Get token metadata
- `owners(uint256)` - Get token owner
- `unicorns(uint256)` - Get unicorn details
- `transfer(address _to, uint256 _id)` - Transfer ownership
- `updateHorn(uint256 newHornSize, uint256 _id)` - Update horn length

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Web3 wallet (MetaMask, Rabby, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cupOJoseph/unicorn-mint.git
cd unicorn-mint
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🎨 UI Features

- **Purple/Blue Gradient Theme**: Magical unicorn-inspired design
- **Glassmorphism Effects**: Modern backdrop blur effects
- **Interactive Elements**: Hover animations and transitions
- **Responsive Design**: Perfect on mobile and desktop
- **Real-time Feedback**: Loading states and success/error messages

## 🌐 Deployment

This app is deployed on Vercel with automatic deployments from the main branch.

## 📝 License

MIT License - feel free to use this code for your own magical NFT projects!

## 🦄 About

Created with love for the unicorn community. Each NFT is unique with customizable horn lengths and majestic status. Join the magical world of unicorn collecting!