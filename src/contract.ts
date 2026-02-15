export const UNICORN_CONTRACT_ADDRESS = '0x0090d53817C85F6BcdCE57E78E857d80A9F586F3' as const;

export const UNICORN_ABI = [
  {
    "type": "function",
    "name": "mintNFT",
    "inputs": [
      { "name": "_hornL", "type": "uint256" },
      { "name": "_name", "type": "string" },
      { "name": "_magestic", "type": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      { "name": "_id", "type": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "string" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owners",
    "inputs": [
      { "name": "", "type": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "unicorns",
    "inputs": [
      { "name": "", "type": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "tuple", 
        "components": [
          { "name": "name", "type": "string" },
          { "name": "hornLength", "type": "uint256" },
          { "name": "isMajestic", "type": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "current_id",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      { "name": "_to", "type": "address" },
      { "name": "_id", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateHorn",
    "inputs": [
      { "name": "newHornSize", "type": "uint256" },
      { "name": "_id", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;