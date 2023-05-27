import { FC } from 'react'
import WalletConnectButtonGroup from '../WalletConnectButtonGroup'
import { Navbar, Text, Avatar, Dropdown } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
  children?: any
}

const IP3Navbar: FC<Props> = ({ className }) => {
  // const rootClassName = cn(s.root, className)

  const collapseItems = ['Profile', 'Dashboard', 'Activity', 'Log Out']

  // const Box = styled('div', {
  //   boxSizing: 'border-box',
  // })

  const AcmeLogo = () => (
    <svg
      className=""
      fill="none"
      height="36"
      viewBox="0 0 32 32"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )

  return (
    <div className="absolute top-0  z-50 flex w-full items-center justify-between px-16 py-8 font-title text-white">
      {/* <div>IP3</div>
      <WalletConnectButtonGroup /> */}
      <div>
        <Link href="/">
          <Image
            src={'/logo-white.png'}
            width={64}
            height={64}
            layout="intrinsic"
            objectFit="contain"
            alt="ip3-logo.png"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4 text-lg tracking-wider text-black">
        <Link href="/auth/assets" className="text-white">
          EXPLORE
        </Link>

        <WalletConnectButtonGroup />
        {/* <Link href="/auth/assets" className="text-black">
          RENT
        </Link>
        <Link href="/auth/assets" className="text-black">
          LEND
        </Link> */}
      </div>

      {/* <Navbar isBordered variant="sticky" maxWidth="fluid">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            '@xs': {
              w: '12%',
            },
          }}
        >
          <Link href="/">
            <Image
              src={'/logo-white.png'}
              width={48}
              height={48}
              layout="intrinsic"
              objectFit="contain"
              alt="ip3-logo.png"
            />
          </Link>
          <Text b color="inherit" hideIn="xs" className="pl-2" size="$xl">
            IP3
          </Text>
        </Navbar.Brand>

        <div className="flex items-center justify-center gap-4 text-lg tracking-wider text-black">
          <Link href="/auth/assets" className="text-black">
            EXPLORE
          </Link>
          <Link href="/auth/assets" className="text-black">
            RENT
          </Link>
          <Link href="/auth/assets" className="text-black">
            LEND
          </Link>
        </div>

        <Navbar.Content
          css={{
            '@xs': {
              w: '12%',
              jc: 'flex-end',
            },
          }}
        >
          <WalletConnectButtonGroup />
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? '$error' : '',
              }}
              isActive={index === 2}
            >
              <Link href="#">{item}</Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar> */}
    </div>
  )
}

export default IP3Navbar
