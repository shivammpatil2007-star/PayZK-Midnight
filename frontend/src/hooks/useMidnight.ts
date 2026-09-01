import { useState } from 'react';
// Replaced DAppConnectorWalletAPI with any due to versioning changes

export const useMidnight = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setError(null);
      
      const midnight = (window as any).midnight;
      if (!midnight) {
        throw new Error("No Midnight wallet extension found. Please install Lace or 1AM wallet.");
      }

      // Discover wallets
      const wallets = Object.values(midnight) as any[];
      if (wallets.length === 0) {
        throw new Error("No Midnight wallets available.");
      }

      // We just pick the first available wallet, typically Lace or 1AM
      const walletProvider = wallets[0];
      const enabledWallet = await walletProvider.enable();
      
      const state = await enabledWallet.state();
      
      // Strict validation of the Preview/Preprod Network
      if (state.networkId !== 'preview' && state.networkId !== 'preprod') {
        throw new Error(`Connected to ${state.networkId} network, but this dApp requires the preview or preprod network.`);
      }

      setWallet(enabledWallet);
      setAddress(state.address);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to connect to wallet');
    }
  };

  const disconnect = () => {
    setWallet(null);
    setAddress(null);
    setError(null);
  };

  return { wallet, address, error, connect, disconnect, setError };
};
