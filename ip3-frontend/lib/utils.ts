// export function getRandomIconFromAddress(address: string) {
//   const num = parseInt(address.slice(-4), 16)
//   return `/logo/${num % 4}.png`
// }

export function parseAddressForShow(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export function isSameAddress(address1: string, address2: string) {
  return (
    address1.trim().toLocaleLowerCase() === address2.trim().toLocaleLowerCase()
  )
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
