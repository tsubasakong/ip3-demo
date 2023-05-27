import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '@components/Layout'
// import { NFT } from '../../constant/types'
// import NFTCard from '@components/NFTCard'
// import { Button } from '@nextui-org/react'
// import { Filter2, Heart } from 'react-iconly'
import { ethers } from 'ethers'
import { ParsedUrlQuery } from 'querystring'
import { NFT, RentableNFT } from '../../../../../constant/types'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import Image from 'next/image'
import DemoSwiper from '@components/Swiper/DemoSwiper'

const predefinedRanges = [
  {
    label: 'Next 10 days',
    value: [new Date(), addDays(new Date(), 10)],
    placement: 'left',
  },
  {
    label: 'Next 30 days',
    value: [new Date(), addDays(new Date(), 30)],
    placement: 'left',
  },
  {
    label: 'Next 3 months',
    value: [new Date(), addMonths(new Date(), 3)],
    placement: 'left',
  },
  {
    label: 'Next 6 months',
    value: [new Date(), addMonths(new Date(), 6)],
    placement: 'left',
  },
  {
    label: 'Next 1 year',
    value: [new Date(), addMonths(new Date(), 12)],
    placement: 'left',
  },
]

const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine,
} = DateRangePicker

export interface QParams extends ParsedUrlQuery {
  contract: string
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { contract, id } = context.query as QParams
  if (!ethers.utils.isAddress(contract) || typeof id !== 'string') {
    return { notFound: true }
  }
  let nft = null
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_DOMAIN}/${process.env.VERSION}/rentableNFT/nft_info`,
      {
        params: {
          collectionAddress: contract,
          collectionTokenId: id,
        },
      }
    )
    if (response.statusText !== 'OK' || !response?.data?.success) {
      return { notFound: true }
    }
    console.log(response.data)
    nft = response?.data?.data[0]
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      nft,
    },
  }
}

interface Props {
  // address: string
  nft: RentableNFT
}

export default function RentPage({ nft }: Props) {
  const { address } = useAccount()
  const [hideSelectorTool, setHideSelectorTool] = useState(false)

  // async function listNewDigitalIP(data: RentableNFT) {
  //   const res = await fetch('/api/authorization/list', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(async (res) => {
  //       if (res.ok) {
  //         return res.json()
  //       } else {
  //         console.log('Authorize failed!', res)
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       if (res.success) {
  //         alert(
  //           `${nft.collectionName} ${nft.collectionTokenId} listed on IP3 successfully!`
  //         )
  //       } else {
  //         alert(res.message)
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  // async function handleList(event: React.MouseEvent<HTMLElement>) {
  //   // event.preventDefault()
  //   if (!address || !ethers.utils.isAddress(address)) {
  //     alert('Please connect your wallet!')
  //     return
  //   }
  //   const data = {
  //     autorizeIP: nft,
  //     authorizer: address,
  //     authorizerStartTime: 1667079531,
  //     authorizerEndTime: 1669757931,
  //     initialRentalPriceByDuration: 1,
  //     initialRentalPriceByAmount: 1,
  //     signiture: 'xxx',
  //     rentalTypes: ['duration', 'amount'],
  //     listed: true,
  //   }
  //   await listNewDigitalIP(data)
  //   // window.location.reload()
  // }

  return (
    <div className="relative w-full">
      <Banner
        title="Choose Your License"
        subtitle="Get the license that fits your best use case."
      ></Banner>

      <div className="flex w-full">
        <div className="relative flex min-h-[80vh] w-1/2 flex-col items-end justify-start bg-black pt-10 text-white">
          <div className="max-w-2xl">
            <DemoSwiper
              images={[
                '/demo/1.jpg',
                '/demo/2.jpg',
                '/demo/3.jpg',
                '/demo/4.jpg',
              ]}
            />

            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-white">
              <div>
                Display category, including but not limited to the use of NFT
                image by exhibition, hanging, propaganda, advertising, etc.
              </div>
            </div>

            <div className="mt-8 flex max-w-2xl gap-10">
              <div className="flex flex-col">
                <div className="opacity-60">Listed Price for Authorization</div>
                <div className="font-title text-lg font-semibold">
                  {nft.currentRentalPriceByDuration} USDT/Day
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-60">Available Until</div>
                <div className="font-title text-lg font-semibold">
                  {`${new Date(
                    nft.authorizerEndTime * 1000
                  ).toLocaleDateString()}`}
                </div>
              </div>
            </div>

            <div className="group relative mt-8 flex max-w-2xl flex-col items-center">
              <div className="relative">
                <Link
                  href={`/assets/ethereum/${nft?.autorizeIP?.collectionAddress}/${nft?.autorizeIP?.collectionTokenId}/confirm/duration`}
                  passHref
                >
                  <div className="relative rounded-full bg-white px-8 py-2 text-black">
                    <div className="text-3xl font-bold tracking-wider text-black">
                      Get License by Days
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="my-6 border-t border-white" /> */}
        </div>

        <div className="relative flex min-h-[80vh] w-1/2 flex-col items-start justify-start bg-white pl-24 pt-10 text-black">
          <div className="max-w-2xl">
            <DemoSwiper
              images={[
                '/demo/5.png',
                '/demo/6.png',
                '/demo/7.png',
                '/demo/8.png',
              ]}
            />

            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-black">
              <div>
                Repeated printing use of NFT on a certain type of goods.
              </div>
            </div>

            <div className="mt-8 flex max-w-2xl gap-10">
              <div className="flex flex-col">
                <div className="opacity-60">Listed Price for Authorization</div>
                <div className="font-title text-lg font-semibold">
                  {nft.currentRentalPriceByAmount} USDT/Piece
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-60">Available Until</div>
                <div className="font-title text-lg font-semibold">
                  {`${new Date(
                    nft.authorizerEndTime * 1000
                  ).toLocaleDateString()}`}
                </div>
              </div>
            </div>

            <div className="group relative mt-8 flex max-w-2xl flex-col items-center">
              <div className="relative">
                <Link
                  href={`/assets/ethereum/${nft?.autorizeIP.collectionAddress}/${nft?.autorizeIP.collectionTokenId}/confirm/amount`}
                >
                  <div className="relative rounded-full bg-black px-8 py-2">
                    <div className="text-3xl font-bold tracking-wider text-white">
                      Get License by Quantity
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="my-6 border-t border-white" /> */}
        </div>
      </div>
    </div>
  )
}

RentPage.Layout = Layout
