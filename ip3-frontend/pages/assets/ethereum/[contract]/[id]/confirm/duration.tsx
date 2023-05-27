import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { PureComponent, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import axios from 'axios'
import Layout from '@components/Layout'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { ParsedUrlQuery } from 'querystring'

import { DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import Image from 'next/image'
import DemoSwiper from '@components/Swiper/DemoSwiper'
import { NFT, RentableNFT } from '../../../../../../constant/types'
import { erc20Abi, ip3Abi } from '../../../../../../constant/abi'
import { Loading } from '@nextui-org/react'
import { getDurationLineChartData, getFirstNDaysPrice } from '@lib/ip3Protocal'

const predefinedRanges = [
  {
    label: 'Next 10 days',
    value: [new Date(), addDays(new Date(), 10)],
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
export default function ConfirmDuration({ nft }: Props) {
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const { data: signer, isError, isLoading } = useSigner()
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000))
  const [endTime, setEndTime] = useState(
    Math.floor(Date.now() / 1000) + 86400 * 10
  ) // + 10 day
  const USDCaddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
  const erc20_rw = useContract({
    address: USDCaddress,
    abi: erc20Abi,
    signerOrProvider: signer,
  })

  async function handlePurchaseLicense() {
    // const erc20_rw = new ethers.Contract(USDCaddress, abi, signer)

    // apporve contract address to use this (ip3 contract on goerli: 0xD42B73522614074f65E7146d91D1A100838Bc9E5)
    const ip3ContractAddress = '0xD42B73522614074f65E7146d91D1A100838Bc9E5'
    if (signer) {
      setLoading(true)
      setLoadingMessage('Approving ERC20 token...')
      let approvalTx = await erc20_rw
        ?.connect(signer)
        .approve(ip3ContractAddress, 10 ** 15) // erc20
      await approvalTx.wait()
      setLoadingMessage('Phurchasing license...')
      const ip3Contract = new ethers.Contract(
        ip3ContractAddress,
        ip3Abi,
        signer
      )
      const _authorizedNFT = [
        [
          nft.autorizeIP.chain,
          nft.autorizeIP.collectionAddress,
          nft.autorizeIP.collectionTokenId,
        ], //nft
        0, // rentalType
        [nft.authorizer, nft.authorizer], //authorizer
        nft.authorizerStartTime,
        nft.authorizerEndTime,
        (nft?.currentRentalPriceByDuration ?? 1) * 10 ** 6, //currentPrice
        Math.floor(Date.now() / 1000), // last active timestamp
      ]

      const _term = [startTime, endTime, 0]
      let purchaseTx = await ip3Contract
        .connect(signer)
        .purchaseAuthorization(_authorizedNFT, _term)
      let purchaseEvent = await purchaseTx.wait()
      setLoading(false)
      setLoadingMessage('')

      // TODO: update the current duration price
    }
  }

  return (
    <div className="relative w-full">
      <Banner title="Confirm" subtitle="Pick your price and date"></Banner>
      <div className="flex w-full items-center justify-center px-8">
        <div className="flex w-full max-w-7xl flex-col items-start justify-center gap-8 py-16">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={getDurationLineChartData(
                  nft?.currentRentalPriceByDuration ?? 1
                )}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="opacity-60">Listed Price for Authorization</div>
              <div className="font-title text-2xl font-semibold">
                {nft.currentRentalPriceByDuration} USDT/Day
              </div>
            </div>

            <div className="flex flex-col">
              <div className="opacity-60">Select duration</div>
              <DateRangePicker
                ranges={predefinedRanges}
                showOneCalendar
                disabledDate={combine(beforeToday(), allowedMaxDays(11))}
                placeholder="Duration"
                style={{ width: 300 }}
                onChange={(dates) => {
                  console.log(dates)
                  if (dates?.length === 2) {
                    setStartTime(Math.floor(dates[0].getTime() / 1000))
                    setEndTime(Math.floor(dates[1].getTime() / 1000))
                  }
                }}
              />
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="opacity-60">Total Price</div>
              <div className="font-title text-2xl font-semibold">
                {getFirstNDaysPrice(
                  Math.round((endTime - startTime) / 86400),
                  nft?.currentRentalPriceByDuration ?? 1
                )}{' '}
                USDT
              </div>
            </div>

            <div className="flex flex-col">
              <div className="opacity-60">Total Days</div>
              <div className="font-title text-2xl font-semibold">
                {`${Math.round((endTime - startTime) / 86400)}`} Days
              </div>
            </div>
          </div>

          <div className="w-full border-t border-black" />

          <div>
            <div className="pt-6 opacity-60">Your right with this License</div>
            <div className="text-black">
              <div>
                Display category, including but not limited to the use of NFT
                image by exhibition, hanging, propaganda, advertising, etc.
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <button
              className="relative rounded-full bg-black px-8 py-2"
              onClick={() => {
                handlePurchaseLicense()
              }}
            >
              <div className="font-title text-3xl font-bold tracking-wider text-white">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading type="default" /> <span>{loadingMessage}</span>
                  </div>
                ) : (
                  'Get this License'
                )}
              </div>
            </button>

            <Link
              href={`/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}/rent`}
              passHref
            >
              <div className="relative rounded-full border border-black bg-white px-8 py-2">
                <div className="font-title text-3xl font-bold tracking-wider text-black">
                  Back
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmDuration.Layout = Layout
