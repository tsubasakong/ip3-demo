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
import { NFT } from '../../../../constant/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

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
  //   const [hideSelectorTool, setHideSelectorTool] = useState(false)
  const { push } = useRouter()
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-7xl items-center justify-center pb-10">
        <div className="my-10 flex w-full justify-center gap-20">
          <div className="w-1/3">
            <div className="relative w-full overflow-hidden bg-white">
              <img
                className="w-full overflow-hidden rounded-lg object-fill transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
                alt="design"
                style={{ aspectRatio: '1' }}
                src={nft.imageUrl}
              />
            </div>
            <div className="mt-10 h-72 w-full bg-slate-200">TBD</div>
          </div>

          <div className="relative flex w-2/3 flex-col gap-8 bg-yellow-200">
            <div className="flex flex-col items-start gap-6">
              <div>{nft.name}</div>
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
              </Button>
              {/* <img
              className="pointer-events-none z-10 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white object-cover px-2 transition-transform 
              duration-200 ease-in-out group-hover:scale-110 lg:h-20 lg:w-20"
              src={
                shop.avatarImageUri?.length > 0
                  ? shop.avatarImageUri
                  : defaultShopAvatar
              }
              alt={shop?.name}
            />
            <div>
              <span className="opacity-60">Designed by: </span>
              <Link href={`/shop/${currTemplate.shopId}`}>
                <a className="opacity-80 hover:cursor-pointer hover:opacity-100">
                  {shop.name}
                </a>
              </Link>
              <div className="text-4xl font-semibold">{currTemplate.name}</div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RentableNFTPage.Layout = Layout
