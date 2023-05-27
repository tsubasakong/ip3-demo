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
import 'rsuite/dist/rsuite.css'
import { useAccount } from 'wagmi'
import Banner from '@components/Banner'
import Link from 'next/link'
import { Input, Loading } from '@nextui-org/react'
import {
  getFirstNQuantityPrice,
  getQuantityLineChartData,
} from '@lib/ip3Protocal'
import { NFTLicense } from '../../constant/types'

const { allowedMaxDays, beforeToday, afterToday, combine } = DateRangePicker

export interface QParams extends ParsedUrlQuery {
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as QParams
  let license = null
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_DOMAIN}/${process.env.VERSION}/rentableNFT/license`,
      {
        params: {
          id: id,
        },
      }
    )
    if (response.statusText !== 'OK' || !response?.data?.success) {
      return { notFound: true }
    }
    license = response?.data?.data
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      license,
    },
  }
}

interface Props {
  license: NFTLicense
}
export default function ConfirmAmount({ license }: Props) {
  return (
    <div className="relative w-full">
      <Banner
        title="Prove of Lisencing"
        subtitle={`This is your Lisence ticket for ${license.autorizeIP.collectionName} #${license.autorizeIP.collectionTokenId}`}
      ></Banner>
      <div className="flex w-full items-center justify-center px-8">
        <div className="flex w-full max-w-7xl items-start justify-center gap-8 py-16">
          <div className="my-10 flex w-full justify-center gap-20">
            <div className="w-2/5">
              <div className="relative w-full overflow-hidden bg-white">
                <img
                  className="w-full overflow-hidden rounded-lg object-fill transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
                  alt="design"
                  style={{ aspectRatio: '1' }}
                  src={`${license.autorizeIP.imageUrl}`}
                />
              </div>
            </div>

            <div className="relative flex w-2/5 flex-col gap-8">
              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start justify-between py-2 font-medium">
                  <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
                    {`${license.autorizeIP.collectionName} #${license.autorizeIP.collectionTokenId}`}
                  </div>
                </div>

                <div className="flex w-full items-center justify-between">
                  <div className="pt-2">
                    <div className="text-sm opacity-40">Authorized by</div>
                    <div>{license.authorizedBy}</div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-sm opacity-40">Authorized to</div>
                  <div>{license.authorizedTo}</div>
                </div>
                <div className="pt-2">
                  <div className="text-sm opacity-40">Contract</div>
                  <div>{license.autorizeIP.collectionAddress}</div>
                </div>
                <div className="w-full border-t-2 border-black" />

                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <div className="opacity-60">Total price</div>
                    <div className="font-title text-2xl font-semibold">
                      {license.totalPrice} USDT
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="opacity-60">License Dates</div>
                    <div className="font-title text-2xl font-semibold">
                      {' '}
                      {`${new Date(
                        license.licenseStartTime * 1000
                      ).toLocaleDateString()} - ${new Date(
                        license.licenseEndTime * 1000
                      ).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="pt-6 opacity-60">
                    Your right with this License
                  </div>
                  <div className="text-black">
                    <div>
                      Display category, including but not limited to the use of
                      NFT image by exhibition, hanging, propaganda, advertising,
                      etc.
                    </div>
                  </div>
                </div>
                {/* <div>{nft.name}</div>
                <Button
                  color="gradient"
                  auto
                  css={{
                    width: '200px',
                  }}
                  onClick={() => {
                    push(
                      `/assets/ethereum/${nft.collectionAddress}/${nft.collectionTokenId}/lend`
                    )
                  }}
                >
                  Lend
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmAmount.Layout = Layout
