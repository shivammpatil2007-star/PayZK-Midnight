import { useState } from 'react';

export const useMidnight = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const getWalletProvider = () => {
    const w = window as any;
    if (w.midnight) {
      // Check known providers first
      if (w.midnight['1am']) return w.midnight['1am'];
      if (w.midnight.nightly) return w.midnight.nightly;
      if (w.midnight.lace) return w.midnight.lace;
      if (w.midnight.mnLace) return w.midnight.mnLace;
      
      // Fallback to the first available injected Midnight wallet
      const keys = Object.keys(w.midnight);
      if (keys.length > 0) return w.midnight[keys[0]];
    }
    
    // Check CIP-30 fallback
    return w.cardano?.lace;
  };

  const connect = async () => {
    try {
      setError(null);
      setIsMockMode(false);
      
      let provider = getWalletProvider();
      
      // Retry polling for 2 seconds (4 attempts) if provider not found immediately
      let attempts = 0;
      while (!provider && attempts < 4) {
        await new Promise(r => setTimeout(r, 500));
        provider = getWalletProvider();
        attempts++;
      }
      
      if (!provider) {
        console.warn("No Midnight wallet extension found after polling. Falling back to Demo/Simulation mode.");
        // Mock Wallet Mode
        setWallet({ mock: true });
        setAddress("mn_addr_mock_1a2b3c4d5e6f7g8h9i0j");
        setIsMockMode(true);
        return;
      }

      // Check if it's the new Midnight DApp Connector API
      let connectedAPI;
      let userAddress;
      
      if (typeof provider.connect === 'function') {
        // Try preview first, fallback to preprod if needed, but connect to what user wants
        // If VITE_NETWORK is set, we use it, otherwise preview
        const network = import.meta.env.VITE_NETWORK || 'preview';
        connectedAPI = await provider.connect(network);
        
        try {
          const { unshieldedAddress } = await connectedAPI.getUnshieldedAddress();
          userAddress = unshieldedAddress;
        } catch (e) {
          console.warn("Could not get unshielded address", e);
          userAddress = 'Connected';
        }
      } else if (typeof provider.enable === 'function') {
        // Fallback for older CIP-30 style wallets
        connectedAPI = await provider.enable();
        if (typeof connectedAPI.state === 'function') {
           const state = await connectedAPI.state();
           userAddress = state.address;
           
           if (state.networkId !== 'preview' && state.networkId !== 'preprod') {
             throw new Error(`Connected to ${state.networkId} network, but this dApp requires preview or preprod.`);
           }
        }
      } else {
        // Unknown provider type
        connectedAPI = provider;
        userAddress = "Connected (Unknown Address)";
      }

      setWallet(connectedAPI);
      setAddress(userAddress);

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
