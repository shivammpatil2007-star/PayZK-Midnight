import { useState } from 'react';

export const useMidnight = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const getLaceProvider = () => {
    const w = window as any;
    return w.midnight?.lace || w.midnight?.mnLace || w.cardano?.lace;
  };

  const connect = async () => {
    try {
      setError(null);
      setIsMockMode(false);
      
      const provider = getLaceProvider();
      
      if (!provider) {
        console.warn("No Midnight wallet extension found. Falling back to Demo/Simulation mode.");
        // Mock Wallet Mode
        setWallet({ mock: true });
        setAddress("mn_addr_mock_1a2b3c4d5e6f7g8h9i0j");
        setIsMockMode(true);
        return;
      }

      // We have a real provider
      let enabledWallet;
      if (typeof provider.enable === 'function') {
        enabledWallet = await provider.enable();
      } else {
        // Some newer API versions might not require .enable() or use a different flow
        enabledWallet = provider;
      }
      
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
    setIsMockMode(false);
  };

  return { wallet, address, error, isMockMode, connect, disconnect, setError };
};
