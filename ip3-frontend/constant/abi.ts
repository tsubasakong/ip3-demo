export const ip3ContractAddress = '0xD42B73522614074f65E7146d91D1A100838Bc9E5'

export const erc20Abi = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',

  // Approve
  'function approve(address spender, uint256 amount) external returns (bool)',
]
export const ip3Abi = [
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'instanceAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'hashedAuthorizeNFT',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'hashedAuthorizeCertificate',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'renterAddress',
        type: 'address',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'chainId',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'NFTAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'tokenId',
                type: 'string',
              },
            ],
            internalType: 'struct NFT',
            name: 'nft',
            type: 'tuple',
          },
          {
            internalType: 'enum RentalType',
            name: 'rentalType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftHolder',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'claimAddress',
                type: 'address',
              },
            ],
            internalType: 'struct Authorizer',
            name: 'authorizer',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'listStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastActive',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct AuthorizedNFT',
        name: 'authorizedNFT',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'chainId',
                    type: 'string',
                  },
                  {
                    internalType: 'address',
                    name: 'NFTAddress',
                    type: 'address',
                  },
                  {
                    internalType: 'string',
                    name: 'tokenId',
                    type: 'string',
                  },
                ],
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
              },
              {
                internalType: 'enum RentalType',
                name: 'rentalType',
                type: 'uint8',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'nftHolder',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'claimAddress',
                    type: 'address',
                  },
                ],
                internalType: 'struct Authorizer',
                name: 'authorizer',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'listStartTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'listEndTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'currentPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lastActive',
                type: 'uint256',
              },
            ],
            internalType: 'struct AuthorizedNFT',
            name: 'authorizedNFT',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'authorizedStartTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'authorizedEndTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'count',
                type: 'uint256',
              },
            ],
            internalType: 'struct Term',
            name: 'term',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'renter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'signature',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct AuthorizeCertificate',
        name: 'authorizeCertificate',
        type: 'tuple',
      },
    ],
    name: 'Purchased',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_hashedCertificate',
        type: 'bytes32',
      },
    ],
    name: 'getAuthroizeCertificateMap',
    outputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'chainId',
                    type: 'string',
                  },
                  {
                    internalType: 'address',
                    name: 'NFTAddress',
                    type: 'address',
                  },
                  {
                    internalType: 'string',
                    name: 'tokenId',
                    type: 'string',
                  },
                ],
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
              },
              {
                internalType: 'enum RentalType',
                name: 'rentalType',
                type: 'uint8',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'nftHolder',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'claimAddress',
                    type: 'address',
                  },
                ],
                internalType: 'struct Authorizer',
                name: 'authorizer',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'listStartTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'listEndTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'currentPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lastActive',
                type: 'uint256',
              },
            ],
            internalType: 'struct AuthorizedNFT',
            name: 'authorizedNFT',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'authorizedStartTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'authorizedEndTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'count',
                type: 'uint256',
              },
            ],
            internalType: 'struct Term',
            name: 'term',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'renter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'signature',
            type: 'bytes32',
          },
        ],
        internalType: 'struct AuthorizeCertificate',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_hashedNFTInfo',
        type: 'bytes32',
      },
    ],
    name: 'getAuthroizeRecordMap',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'totalAuthorizedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalTransactionRevenue',
            type: 'uint256',
          },
        ],
        internalType: 'struct AuthorizeRecord',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lastActive',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_currentPrice',
        type: 'uint256',
      },
    ],
    name: 'getCurrentPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'string',
                name: 'chainId',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'NFTAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'tokenId',
                type: 'string',
              },
            ],
            internalType: 'struct NFT',
            name: 'nft',
            type: 'tuple',
          },
          {
            internalType: 'enum RentalType',
            name: 'rentalType',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'nftHolder',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'claimAddress',
                type: 'address',
              },
            ],
            internalType: 'struct Authorizer',
            name: 'authorizer',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'listStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastActive',
            type: 'uint256',
          },
        ],
        internalType: 'struct AuthorizedNFT',
        name: '_authorizedNFT',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'authorizedStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'authorizedEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'count',
            type: 'uint256',
          },
        ],
        internalType: 'struct Term',
        name: '_term',
        type: 'tuple',
      },
    ],
    name: 'purchaseAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]
