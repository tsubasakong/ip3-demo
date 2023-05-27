import { ethers } from 'ethers'

export default async function handler(req, res) {
  const { collection, tokens } = req.query
  try {
    if (ethers.utils.isAddress(collection)) {
      const connection = {
        url: 'https://white-special-uranium.discover.quiknode.pro/f4bbea35c7b4bd33649713e4e53b43434811bbb0/',
        headers: { 'x-qn-api-version': 1 },
      }
      const provider = new ethers.providers.JsonRpcProvider(connection)
      const heads = await provider.send('qn_fetchNFTsByCollection', {
        // @ts-ignore
        omitFields: ['provenance'],
        collection: collection,
        tokens: tokens.split(','),
        page: 1,
        perPage: 10,
      })
      return res.status(200).json({ data: heads, success: true })
    } else {
      return res
        .status(400)
        .json({ message: 'collection is not valid', success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error, success: false })
  }
}
