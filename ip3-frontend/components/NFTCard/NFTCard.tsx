import Link from 'next/link'
import { NFT, RentableNFT } from '../../constant/types'
import { Checkbox, DateRangePicker } from 'rsuite'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import 'rsuite/dist/rsuite.css'
import { Loading } from '@nextui-org/react'

import { Modal, useModal, Button, Text } from '@nextui-org/react'
import { useAccount, useSignMessage } from 'wagmi'
import { ethers } from 'ethers'
import LoadingState from '@components/Loading/Loading'
import { useState } from 'react'

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

interface Props {
  nft: NFT
}

const NFTCard = ({ nft }: Props) => {
  const { setVisible, bindings } = useModal()
  const [loadingModalVisable, setLoadingModalVisable] = useState(false)

  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const [priceByDuration, setPriceByDuration] = useState('1')
  const [priceByAmount, setPriceByAmount] = useState('1')
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000))
  const [endTime, setEndTime] = useState(
    Math.floor(Date.now() / 1000) + 2629743
  ) // + 1 month

  const handleAuth = async () => {
    try {
      const message = `You agree to authorize ${nft.collectionName} ${nft.collectionTokenId} to the IP3 platform`
      const signature = await signMessageAsync({ message })
      if (!address || !ethers.utils.isAddress(address)) {
        alert('Please connect your wallet!')
        return
      }

      console.log(startTime, endTime)
      const data = {
        autorizeIP: nft,
        authorizer: address,
        authorizerStartTime: startTime,
        authorizerEndTime: endTime,
        initialRentalPriceByDuration: Number(priceByDuration),
        initialRentalPriceByAmount: Number(priceByAmount),
        currentRentalPriceByDuration: Number(priceByDuration),
        currentRentalPriceByAmount: Number(priceByAmount),
        signiture: 'xxx',
        rentalTypes: ['duration', 'amount'],
        listed: true,
      }
      await listNewDigitalIP(data)
      setVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

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

  return (
    <div className="relative z-10 w-full rounded-lg border border-black text-black">
      <Link
        href={`/assets/ethereum/${nft.collectionAddress}/${nft.collectionTokenId}`}
        passHref
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            className="block w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
            alt="design"
            style={{ aspectRatio: '1' }}
            src={nft.imageUrl}
          />
        </div>
      </Link>

      <div className="flex w-full flex-col py-4">
        <div className="flex w-full flex-col items-start justify-between px-4 font-medium">
          <div className="truncate pr-2 text-sm">
            {`${nft.collectionName} #${nft.collectionTokenId}`}
          </div>

          {/* <div className="flex items-center justify-center rounded-2xl border-[0.5px] border-black px-4 font-title text-sm">
            Choose Avalibility
          </div> */}

          <div className="flex w-full flex-col pl-4 pt-2">
            <Checkbox defaultSelected={true} size="xs">
              <span className="pl-2 font-content text-xs font-semibold">
                Authorize by time
              </span>
            </Checkbox>
            <div className="flex items-center justify-start gap-2 bg-[#0004C3] bg-opacity-5 px-4 py-2">
              <div className="text-xs text-[#0004C3]">Set Your Price</div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.001"
                required
                className="w-24 rounded-xl border border-[#0004C3] bg-[#0004C3] bg-opacity-5 pl-4 text-sm text-opacity-60"
                // className={classNames(styles.inputStyles)}
                onChange={(e) => {
                  setPriceByDuration(e.target.value)
                }}
                value={priceByDuration}
              />
              <div className="text-xs text-[#0004C3] opacity-80">
                USDT / Day
              </div>
            </div>

            <Checkbox defaultSelected={true} size="xs">
              <span className="pl-2 font-content text-xs font-semibold">
                Authorize by quantity
              </span>
            </Checkbox>

            <div className="flex items-center justify-start gap-2 bg-[#0004C3] bg-opacity-5 px-4 py-2">
              <div className="text-xs text-[#0004C3]">Set Your Price</div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                step="0.001"
                required
                className="w-24 rounded-xl border border-[#0004C3] bg-[#0004C3] bg-opacity-5 pl-4 text-sm text-opacity-60"
                // className={classNames(styles.inputStyles)}
                onChange={(e) => {
                  setPriceByAmount(e.target.value)
                }}
                value={priceByAmount}
              />
              <div className="text-xs text-[#0004C3] opacity-80">
                USDT / Amount
              </div>
            </div>

            <div className="pt-4">
              <DateRangePicker
                ranges={predefinedRanges}
                disabledDate={beforeToday()}
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

          <button
            className=" mt-4 flex items-center justify-center place-self-center rounded-2xl bg-black px-4 font-title text-sm text-white"
            onClick={() => setVisible(true)}
          >
            Authorize
          </button>
        </div>
      </div>

      <Modal
        className="font-content"
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            IP3 Terms of Service
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description" className=" whitespace-pre-line">
            {`Welcome to IP3! \n IP3 is a decentralized platform for NFT copyright
            authorization where NFT holders and certain licensee are both users
            of IP3（“IP3”, “platform”）. Whether you are an NFT holder or a NFT
            licensee, your blockchain address acts as your identity on IP3.
            Therefore, you will need a blockchain address and a third-party
            wallet to receive services from the platform. Your IP3 account
            (“account”) will be associated with your blockchain address.
            \nThese Terms of Service (“Terms”), as posted on the IP3 Platform, will
            govern your behavior of access and use of IP3 Website, APIs, and
            mobile applications (“Apps”), and all software, tools, features or
            functionality available on them with our services. You can only use
            our services when you accept these Terms. \n NFT license means that NFT
            holder authorizes any other person (“licensee”) to reproduce his/her
            NFT’s image and to use the image in some specific legitimate
            commercial activities, including exhibition and display of the NFT
            image or usage of the NFT image on certain products, either alone or
            in association with other brands. For the convenience of
            understanding, the NFT holder is the “licensor” and the authorized
            person is the “licensee”. The default NFT authorization type of IP3
            is non-exclusive license way, which means one certain NFT can be
            licensed to different licensees. On the other hand, the licensor can
            set exclusive license for a certain NFT license by his/her own
            discretion. Licensee can appropriately adjust licensed NFT’s image
            to adapt commercial scenario while maintaining the integrity of the
            NFT, but such adjustment shall not constitute a new creation of any
            work. The platform currently provides two ways of licensing ,
            licensing by term and licensing by quantity, in either way can
            licenser get the license fee. The platform can alter the scope, mode
            and duration of license according to the market, but the contracts
            executed previously shall not be affected. \n For licensor, when you
            decide to license your NFT to any licensee on IP3, you need to sign
            by your wallet address, which the NFT within, and to confirm that
            you agree to license your NFT image to others. However, IP3 shall
            not require you to do setApprovalForAll approvement or transfer your
            NFT to any licensee’s wallet. At the same time, you should designate
            a separate wallet to receive the license fee. Licensor who elects an
            exclusive license may re-elect a non-exclusive license after the
            expiration of license period or the execution of the licensed use
            times. However, licensor who elects a non-exclusive license cannot
            reset a non-exclusive license to an exclusive license while holding
            the NFT, unless the NFT ownership are transferred and then the
            license shall be reset by a new NFT holder. Licensee shall identify
            commercial scenarios for usage of the NFT in advance. At present,
            there are two essential usage scenarios: exhibition (including but
            not limited to the use of NFT images by exhibition, hanging,
            publicity, advertising, etc) and publishment (eg. use the image the
            NFT on some products’ packaging). \n Furthermore, exhibition way shall
            be licensed by term and publishment shall be licensed by use times.
            If licensee want to use the NFT image under both scenarios at the
            same time, eg. to print some souvenirs at the same time of
            exhibition, licensee need to place license application orders
            separately to obtain both authorizations. License Fee By Term If
            license by term, the license fee shall be settled on daily basis,
            and the daily price shall be quoted in ETH (USD)by licensor.
            Starting Price: The default starting price is 1 USD per day.
            Licensors could also set their own price, but if there is no
            potential licensee to accept the price, the automatic price
            reduction mechanism will active, and the price would fall to 1 USD
            per day. Automatic Price Increase Mechanism: Starting Price of a
            certain NFT license will be automatically increased according to a
            algorithm based on the data of each transaction, calculated as
            follows: Assuming the initial Starting Price is 1USD, the the
            proportion of the price makup will be 0.9, 0.8, 0.7...0.2, 0.1 each
            time, and will be reduced to 0.05 and remain 0.05 afterwards. If
            licensor alters Starting Price, the increase mechanism will start
            again. \n Automatic Price Reduction Mechanism: If there is no
            transaction after 10 days since the NFT published on IP3, the
            Automatic Price Increase Mechanism (the 0.05 times plus on Starting
            Price) will be invalid; if there is still no transaction after 20
            days since published, Starting Price will be automatically reduced
            by 0.95 times each time until bottom to 1USD. Continuous Rental &
            Daily Discount: Daily Price = Starting Price * (10- DayN+1)/10 E.g.
            The price of the 1st day is Starting Price, the 2ed day will be 0.9
            times of Starting Price, the 3rd day will be 0.8 times of Starting
            Price … …, and the 10th day will be 0.1 times of Starting Price,
            which is the lowest price and will come into effect from the 11th
            day. 5. License term. License term will be set by licensor, and the
            license fee will be paid by licensee in advance. If licensor
            transfers the ownership of the NFT before the expiration of license
            term, the revenue of the remaining period will automatically be
            acquired by the new NFT holder. When certain license term expires,
            licensor needs to re-sign and publish his/her NFT on IP3. License
            Fee By Use Times If license by use times, the default license term
            shall be one (1) year and the license fee shall be settled as below:
            Starting Price: The default starting price is 1 USD per day.
            Licensors could also set their own price, but if there is no
            potential licensee to accept the price, the automatic price
            reduction mechanism will active, and the price would fall to 1 USD
            per day. Automatic Price Increase Mechanism：same as the Automatic
            price increase mechanism of license by term. Automatic Price
            Reduction Mechanism：same as the Automatic price reduction mechanism
            of license by term. Continuous Rental & Unit Price Discount：The
            smart contract will consider the use times of NFT in a single
            license order will be a duplicate of the NFT, and the unit price for
            each use will be discounted until the lowest price would be 0.1
            times of starting price. If use times exceeds 10, from the 11th,
            licensee and licensor can arrange a custom price. Licensee should
            place a license order with certain use times. The default maximum
            use times for automatic transactions is 1000 and beyond which
            continuous orders are required. During license term, the license fee
            is settled on a daily basis and licensor can withdraw license fee
            daily. If licensor transfers the ownership of the NFT before the
            expiration of license term, the revenue of the remaining period will
            automatically be acquired by the new NFT holder. When certain
            license term expires, licensor needs to re-sign and publish his/her
            NFT on IP3. After one successful transaction, users can obtain a
            license marker. The marker will record the content and duration of
            the authorization. If users use the marker in an agreed certain
            usage scenario and submits data of the applied scenario to IP3
            before the expiration of the usage period, he/she can receive a
            discount or commission from IP3. The platform will pay 50% of
            license fee to the licensor, and 50% of license fee will be saved in
            IP3 treasury and will be used for all users and builders of IP3 in
            the future, the allocation scheme will be from the community in the
            form of proposals. IP3 platform provides C2C NFT license service
            between users, where users will complete NFT image license
            transaction on basis of free consultation. When licensee uses the
            licensed NFT image overstepping licensed period, licensed use times
            or other license restrictions, or the license is deemed to be
            illegal and causes any damage to licensor under applicable law, the
            licensor has the right to disclose the infringement and claim rights
            by all lawful means, and also has the right to initiate a lawsuit
            against the infringer for compensation in accordance with the laws
            of his country of residence or the laws of the infringer's country
            of residence, by a judicial body convenient to him.`}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color={'default'} onClick={() => setVisible(false)}>
            CLOSE
          </Button>
          <Button auto onClick={handleAuth}>
            AGREE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default NFTCard
