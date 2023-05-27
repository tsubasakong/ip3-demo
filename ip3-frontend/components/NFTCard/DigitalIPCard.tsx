import { Avatar, Badge, Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Checkbox, DateRangePicker } from 'rsuite'
import { RentableNFT } from '../../constant/types'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { parseAddressForShow } from '@lib/utils'
interface Props {
  nft: RentableNFT
}

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

const { beforeToday } = DateRangePicker

export default function DigitalIPCard({ nft }: Props) {
  const { push } = useRouter()
  const { data: ensName } = useEnsName({
    address: nft.autorizeIP.currentOwner,
  })
  console.log(ensName)
  const avatar = useEnsAvatar({
    addressOrName: ensName ?? '',
  })

  return (
    <div className="relative z-10 w-full rounded-lg border border-black text-black">
      <Link
        href={`/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}/rent`}
        passHref
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            className="block w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            alt="design"
            style={{ aspectRatio: '1' }}
            src={nft.autorizeIP.imageUrl}
          />
        </div>
      </Link>

      <div className="flex w-full flex-col py-4 font-content">
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col items-start justify-between py-2 font-medium">
            <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
              {`${nft.autorizeIP.collectionName} #${nft.autorizeIP.collectionTokenId}`}
            </div>
          </div>

          <button
            className="flex items-center justify-center rounded-2xl bg-black px-4 pr-4 font-title text-sm text-white"
            onClick={() => {
              push(
                `/assets/ethereum/${nft.autorizeIP.collectionAddress}/${nft.autorizeIP.collectionTokenId}/rent`
              )
            }}
          >
            Get License
          </button>
        </div>

        <div className="pl-8 pt-2">
          <div className="text-sm opacity-40">List Price for Authorization</div>
          <div>{nft.currentRentalPriceByDuration} USDT/Day</div>
          <div>{nft.currentRentalPriceByAmount} USDT/Amount</div>
        </div>

        <div className="mx-6 my-4 border-t border-black " />

        <div className="pl-8">
          <div>Owner</div>
          <div>
            {avatar.data && <Avatar size="sm" src={avatar.data} />}
            <Badge isSquared>
              {ensName ? (
                <div>{ensName}</div>
              ) : (
                <div> {parseAddressForShow(nft.autorizeIP.currentOwner)}</div>
              )}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
