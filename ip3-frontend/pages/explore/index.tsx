import { classNames, parseAddressForShow } from '@lib/utils'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '@components/Layout'
import { NFT, RentableNFT } from '../../constant/types'
import NFTCard from '@components/NFTCard'
import {
  Avatar,
  Button,
  Checkbox,
  Collapse,
  Dropdown,
  Input,
  Text,
} from '@nextui-org/react'
import { Filter2, Heart } from 'react-iconly'
import dynamic from 'next/dynamic'

const DigitalIPCard = dynamic(
  () => import('@components/NFTCard/DigitalIPCard'),
  {
    ssr: false,
  }
)

import Banner from '@components/Banner'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const address = context.params?.address

  // if (typeof address !== 'string') {
  //   return { notFound: true }
  // }
  let nfts = []
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_DOMAIN}/${process.env.VERSION}/rentableNFT`,
      {
        params: {},
      }
    )
    if (response.statusText !== 'OK' || !response?.data?.success) {
      return { notFound: true }
    }
    nfts = response?.data?.data
    // console.log(nfts)
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      nfts,
    },
  }
}

interface Props {
  //   address: string
  nfts: RentableNFT[]
}
export default function ExplorePage({ nfts }: Props) {
  const [hideSelectorTool, setHideSelectorTool] = useState(false)
  const [selected, setSelected] = React.useState(new Set(['USDT']))

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected]
  )

  return (
    <div className="relative w-full pb-10">
      <Banner
        title="Explore"
        subtitle="Get copyright licenses authorization from world famous IPs "
      ></Banner>
      <div className="relative flex w-full flex-col items-center justify-between px-12">
        <div className="sticky top-14 z-10 w-full">
          <Button
            className="mt-2"
            auto
            rounded
            css={{ background: 'none' }}
            onClick={() => setHideSelectorTool((s) => !s)}
            icon={<Filter2 set="bold" primaryColor="black" />}
          />
          {/* <div className="flex h-12 w-full items-center bg-white shadow-lg">
            <Button
              auto
              rounded
              onClick={() => setHideSelectorTool((s) => !s)}
              icon={<Filter2 set="bold" primaryColor="white" />}
            />
          </div> */}
        </div>

        <div className="relative z-0 mt-4 flex items-start justify-center gap-8">
          {!hideSelectorTool && (
            <div className="sticky top-28 flex min-h-[32rem] w-72 flex-shrink-0 flex-col">
              <Collapse.Group>
                <Collapse title="Collections">
                  <Checkbox.Group
                    color="secondary"
                    // defaultValue={['buenos-aires']}
                  >
                    <Checkbox value="bayc">
                      <div className="flex items-center gap-2">
                        <Avatar
                          squared
                          size={'sm'}
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        <div className="text-sm">BAYC</div>
                      </div>
                    </Checkbox>
                    <Checkbox value="cryptopunks">
                      <div className="flex items-center gap-2">
                        <Avatar
                          squared
                          size={'sm'}
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        <div className="text-sm">CRYPTOPUNKS</div>
                      </div>
                    </Checkbox>
                    <Checkbox value="azuki">
                      <div className="flex items-center gap-2">
                        <Avatar
                          squared
                          size={'sm'}
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        <div className="text-sm">Azuki</div>
                      </div>
                    </Checkbox>
                    <Checkbox value="mfer">
                      <div className="flex items-center gap-2">
                        <Avatar
                          squared
                          size={'sm'}
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                        <div className="text-sm">mfer</div>
                      </div>
                    </Checkbox>
                  </Checkbox.Group>
                </Collapse>
                <Collapse title="Price">
                  <div className="flex w-full flex-col">
                    <div className="mt-6 flex items-end gap-2">
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          css={{ tt: 'capitalize' }}
                          color="secondary"
                        >
                          {selectedValue}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Currency Types"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selected}
                          onSelectionChange={setSelected}
                        >
                          <Dropdown.Item key="USDT">USDT</Dropdown.Item>
                          <Dropdown.Item key="APE">APE</Dropdown.Item>
                          <Dropdown.Item key="ETH">ETH</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Input label="MIN" type={'number'} />
                      <Input label="MAX" type={'number'} />
                    </div>
                    <Button color="secondary" auto className="mt-2 w-full">
                      Apply
                    </Button>
                  </div>
                </Collapse>
                <Collapse title="Authorize Type">
                  <Checkbox.Group color="secondary">
                    <Checkbox value="bayc">
                      <div className="text-sm">By Duration</div>
                    </Checkbox>
                    <Checkbox value="cryptopunks">
                      <div className="text-sm">By Quantity</div>
                    </Checkbox>
                  </Checkbox.Group>
                </Collapse>
              </Collapse.Group>
            </div>
          )}

          {nfts.length > 0 ? (
            <div className="grid w-full grid-cols-1 items-stretch gap-6 px-8 lg:grid-cols-3">
              {nfts.map((nft, idx) => (
                <DigitalIPCard nft={nft} key={idx} />
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

ExplorePage.Layout = Layout
