import { createConfig, configureChains, Chain } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

const metadata = {
  name: 'Velvet Coin',
  description: 'Luxury Fashion E-commerce with Cryptocurrency',
  url: 'https://velvetcoin.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ 
      chains,
      options: {
        shimDisconnect: true,
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
        metadata,
        qrModalOptions: {
          themeMode: 'light'
        }
      }
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: metadata.name,
        headlessMode: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
});

export const supportedChains: Chain[] = chains;