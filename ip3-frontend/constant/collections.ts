export const collections = [
  {
    name: 'Azuki',
    symbol: 'Azuki',
    contract: '0xed5af388653567af2f388e6224dc7c4b3241c544',
    icon: '/community/azuki-icon.png',
    banner: '/community/azuki-banner.png',
    bg: '/community/azuki-bg.png',
  },
  {
    name: 'Bored Ape Yacht Club',
    symbol: 'BAYC',
    contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    icon: '/community/bayc-icon.png',
    banner: '/community/bayc-banner.png',
    bg: '/community/bayc-bg.png',
  },
  {
    name: 'mfers',
    symbol: 'mfer',
    contract: '0x79fcdef22feed20eddacbb2587640e45491b757f',
    icon: '/community/mfers-icon.png',
    banner: '/community/mfers-banner.png',
    bg: '/community/mfers-bg.png',
  },
]

export const collectionsContracts = collections.map((c) => c.contract)

export type Collection = {
  name: string
  symbol: string
  contract: string
  icon: string
  bg: string
  banner: string
}

export function getCollectionFromAddress(address: string) {
  return collections.find(
    (c) => c.contract.toLocaleLowerCase() === address.toLocaleLowerCase()
  )
}

export function getCollectionName(targetContract: string) {
  return collections.find(
    (c) => c.contract.toLocaleLowerCase() === targetContract.toLocaleLowerCase()
  )?.symbol
}

export function getCollectionIcon(targetContract: string) {
  return (
    collections.find(
      (c) =>
        c.contract.toLocaleLowerCase() === targetContract.toLocaleLowerCase()
    )?.icon ?? ''
  )
}

// export function getTestWalletFromCollection(collectionContract: string) {
//   const lowercaseCollectionContract = collectionContract.toLocaleLowerCase()
//   switch (lowercaseCollectionContract) {
//     case '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d': // BAYC
//       return '0xc6a7463a7ee700d035aff7bfd1ee198d680a4164'
//     case '0xed5af388653567af2f388e6224dc7c4b3241c544': // Azuki
//       return '0x87ad0267b437575b58624AFbB67AD3a7f6876566'
//     case '0x79fcdef22feed20eddacbb2587640e45491b757f': // mfer
//       return '0x3496f3600070CC01d9665d1057F6F39afC0fe149'
//     case '0xa55d6016065fd576e64f3081cd64e1dd3a0488da': // minimen
//       return '0x7E56A9D3d45C01590005440621b9f03e3c9f7d5A'
//     case '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7': // loot
//       return '0x69d3158A17e11FBbdB2a0E7E8Bd05aC3628e3630'
//     case '0x495f947276749ce646f68ac8c248420045cb7b5e':
//       return '0x7349E939bb99c802A43374D23511c69f736B50f0'
//     default:
//       return ''
//   }
// }
