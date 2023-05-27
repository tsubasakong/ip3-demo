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
import { Button, Text } from '@nextui-org/react'
import { NFT, RentableNFT } from '../../../../../constant/types'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'

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
      `${process.env.DOMAIN_URL}/api/nft/getNFTsByCollection`,
      {
        params: {
          collection: contract,
          tokens: id,
        },
      }
    )
    if (
      response.statusText !== 'OK' ||
      !response?.data?.success ||
      response?.data?.tokens?.length === 0
    ) {
      return { notFound: true }
    }
    nft = response?.data?.data?.tokens[0]
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
  nft: NFT
}

export default function RentableNFTPage({ nft }: Props) {
  const { address } = useAccount()
  //   const [hideSelectorTool, setHideSelectorTool] = useState(false)

  async function listNewDigitalIP(data: RentableNFT) {
    const res = await fetch('/api/authorization/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('Authorize failed!', res)
        }
      })
      .then((res) => {
        console.log(res)
        if (res.success) {
          alert(
            `${nft.collectionName} ${nft.collectionTokenId} listed on IP3 successfully!`
          )
        } else {
          alert(res.message)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  async function handleList(event: React.MouseEvent<HTMLElement>) {
    // event.preventDefault()
    if (!address || !ethers.utils.isAddress(address)) {
      alert('Please connect your wallet!')
      return
    }
    const data = {
      autorizeIP: nft,
      authorizer: address,
      authorizerStartTime: 1667079531,
      authorizerEndTime: 1669757931,
      initialRentalPriceByDuration: 1,
      initialRentalPriceByAmount: 1,
      signiture: 'xxx',
      rentalTypes: ['duration', 'amount'],
      listed: true,
    }
    await listNewDigitalIP(data)
    // window.location.reload()
  }
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-7xl items-center justify-center pb-10">
        <div className="my-10 flex w-full justify-center gap-20">
          <div className="relative flex w-2/3 flex-col gap-8 bg-yellow-200">
            <div className="relative flex flex-col items-start gap-6">
              <Text h2 className="font-bold tracking-wide">
                List item for lend
              </Text>
              <div>Duration</div>
              {/* https://rsuitejs.com/components/date-range-picker/ */}
              <div className="relative z-20">
                <DateRangePicker
                  ranges={predefinedRanges}
                  disabledDate={beforeToday()}
                  placeholder="Duration"
                  style={{ width: 300 }}
                />
              </div>
              <div className="relative z-0">
                <Button
                  color="gradient"
                  auto
                  css={{
                    width: '200px',
                  }}
                  onClick={handleList}
                >
                  Complete listing
                </Button>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="relative w-full overflow-hidden bg-white">
              <img
                className="w-full overflow-hidden rounded-lg object-fill transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
                alt="design"
                style={{ aspectRatio: '1' }}
                src={nft.imageUrl}
              />
              <div>{nft.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RentableNFTPage.Layout = Layout
