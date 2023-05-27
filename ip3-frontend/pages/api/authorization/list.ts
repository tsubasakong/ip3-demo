import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RentableNFT } from '../../../constant/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    authorizer,
    authorizerStartTime,
    authorizerEndTime,
    initialRentalPriceByDuration,
    initialRentalPriceByAmount,
    currentRentalPriceByDuration,
    currentRentalPriceByAmount,
    rentalTypes,
    signiture,
    autorizeIP,
  }: RentableNFT = req.body

  try {
    const postData = {
      autorizeIP,
      authorizer,
      authorizerStartTime,
      authorizerEndTime,
      initialRentalPriceByDuration,
      initialRentalPriceByAmount,
      currentRentalPriceByDuration,
      currentRentalPriceByAmount,
      rentalTypes,
      listed: true,
      signiture,
    }
    const result = await fetch(
      `${process.env.BACKEND_API_DOMAIN}/${process.env.VERSION}/rentableNFT`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(postData),
      }
    )
      .then((resp) => {
        return resp.json()
        // if (resp.ok) {
        //   return resp.json()
        // } else {
        //   throw new Error(
        //     'List digital ip on IP3 platform error, please try again later.'
        //   )
        // }
      })
      .then((res) => res)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
}
