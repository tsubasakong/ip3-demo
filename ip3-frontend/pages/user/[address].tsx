import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '@components/Layout'
import { NFT } from '../../constant/types'
import NFTCard from '@components/NFTCard'
import { Button } from '@nextui-org/react'
import { Filter2, Heart } from 'react-iconly'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const address = context.params?.address

  if (typeof address !== 'string') {
    return { notFound: true }
  }
  let nfts = []
  try {
    const response = await axios.get(
      `${process.env.DOMAIN_URL}/api/nft/getNFTs`,
      {
        params: {
          address: address,
        },
      }
    )
    if (response.statusText !== 'OK' && !response?.data?.success) {
      return { notFound: true }
    }
    nfts = response?.data?.data?.assets
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      address,
      nfts,
    },
  }
}

interface Props {
  address: string
  nfts: NFT[]
}
export default function UserProfile({ address, nfts }: Props) {
  const [hideSelectorTool, setHideSelectorTool] = useState(true)
  console.log(nfts)
  return (
    <div className="w-full pb-10">
      <div className="relative flex w-full flex-col items-center justify-between px-12">
        {/* <div className="sticky top-14 z-10 w-full">
          <div className="flex h-12 w-full items-center bg-white shadow-lg">
            <Button
              auto
              rounded
              onClick={() => setHideSelectorTool((s) => !s)}
              icon={<Filter2 set="bold" primaryColor="white" />}
            />
          </div>
        </div> */}

        <div className="relative z-0 mt-4 flex items-start justify-center gap-8">
          {!hideSelectorTool && (
            <div className="sticky top-28 flex min-h-[32rem] w-72 flex-shrink-0 flex-col shadow-lg">
              <div>This is left tool bar</div>
              <div>Price</div>
              <div>Collections</div>
            </div>
          )}

          {nfts.length > 0 ? (
            <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-4 lg:grid-cols-4">
              {nfts.map((nft, idx) => (
                <NFTCard nft={nft} key={idx} />
              ))}
            </div>
          ) : (
            <div className="mt-10 w-full flex-shrink-0"> No design</div>
          )}
        </div>
      </div>
    </div>
  )
}

UserProfile.Layout = Layout
