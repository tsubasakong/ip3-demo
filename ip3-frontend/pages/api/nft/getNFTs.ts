import { ethers } from 'ethers'
import { collectionsContracts } from '../../../constant/collections'

export default async function handler(req, res) {
  const { address, page, contract } = req.query
  try {
    if (ethers.utils.isAddress(address)) {
      const connection = {
        url: 'https://white-special-uranium.discover.quiknode.pro/f4bbea35c7b4bd33649713e4e53b43434811bbb0/',
        headers: { 'x-qn-api-version': 1 },
      }
      const provider = new ethers.providers.JsonRpcProvider(connection)
      // provider.connection.headers = { 'x-qn-api-version': 1 }
      const heads = await provider.send('qn_fetchNFTs', {
        // @ts-ignore
        wallet: address,
        omitFields: ['provenance', 'traits'],
        contracts: ethers.utils.isAddress(contract)
          ? [contract]
          : collectionsContracts,
        page: isNaN(Number(page)) ? 1 : Number(page),
        perPage: 40,
      })
      return res.status(200).json({ data: heads, success: true })
    } else {
      return res
        .status(400)
        .json({ message: 'address is not valid', success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error, success: false })
  }
}
