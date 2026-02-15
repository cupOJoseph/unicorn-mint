import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Unicorn Mint',
  projectId: 'b5e6d3b3c6f3e4d5a6b7c8d9e0f1a2b3',
  chains: [arbitrum],
  ssr: true, // If your dApp uses server side rendering (SSR)
});