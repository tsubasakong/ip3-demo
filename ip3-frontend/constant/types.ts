export type NFT = {
  name: string
  collectionTokenId: string
  collectionName: string
  imageUrl: string
  collectionAddress: string
  chain: string
  network: string
  description: string
  currentOwner: string
}

export interface RentableNFT {
  authorizer: string
  authorizerStartTime: number // Unix Timestamp
  authorizerEndTime: number // Unix Timestamp
  initialRentalPriceByDuration: number
  currentRentalPriceByDuration?: number
  initialRentalPriceByAmount: number
  currentRentalPriceByAmount?: number
  rentalTypes: string[]
  signiture: string
  listed: boolean
  autorizeIP: NFT
}

export interface NFTLicense {
  authorizedBy: string
  authorizedTo: string
  autorizeIP: NFT
  licenseStartTime: number // Unix Timestamp
  licenseEndTime: number // Unix Timestamp
  licenseQuantity: number
  totalPrice: number
  rentalType: string
  signiture: string
}
