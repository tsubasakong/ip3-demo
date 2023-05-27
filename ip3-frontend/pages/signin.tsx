import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useNetwork,
} from 'wagmi'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'

interface Props {}

export default function SignIn({}: Props) {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { status } = useSession()
  const { signMessageAsync } = useSignMessage()
  const { disconnectAsync } = useDisconnect()
  const { push } = useRouter()

  const handleAuth = async () => {
    const userData = { address, chain: chain?.id, network: 'evm' }

    try {
      const { data } = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      })
      const message = data.message
      const signature = await signMessageAsync({ message })

      // redirect user after success authentication to '/user' page
      const res = await signIn('credentials', {
        message,
        signature,
        redirect: false,
        callbackUrl: '/user',
      })
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      if (res?.url) {
        push(res.url)
      }
    } catch (error) {
      disconnectAsync()
      console.error(error)
    }
  }

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <div className="flex gap-2">
        <ConnectButton />
        {status === 'unauthenticated' && isConnected && (
          <button
            className="bg-cyan-500 px-2 py-1"
            onClick={() => handleAuth()}
          >
            Verify
          </button>
        )}
      </div>
    </div>
  )
}

SignIn.Layout = Layout
