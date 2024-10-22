'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Web3Modal Demo</h1>
      {isConnected ? (
        <div>
          <p>connected wallet address: {address}</p>
          <button onClick={() => disconnect()}>disconnect</button>
        </div>
      ) : (
        <button onClick={() => open()}>connect wallet</button>
      )}
    </div>
  )
}
