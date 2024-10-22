'use client'

import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";

// replace with your project id
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [w3mProvider({ projectId }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
  webSocketPublicClient,
});

const ethereumClient = new EthereumClient(config, chains);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          {children}
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </body>
    </html>
  );
}
