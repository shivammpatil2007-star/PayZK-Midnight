import { useState } from 'react';

export const useMidnight = () => {
  const [walletProvider, setWalletProvider] = useState<any>(null); // Internal only
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const getWalletProvider = () => {
    const w = window as any;
    if (w.midnight) {
      if (w.midnight['1am']) return w.midnight['1am'];
      if (w.midnight.nightly) return w.midnight.nightly;
      if (w.midnight.lace) return w.midnight.lace;
      if (w.midnight.mnLace) return w.midnight.mnLace;
      const midnightKeys = Object.keys(w.midnight);
      if (midnightKeys.length > 0) return w.midnight[midnightKeys[0]];
    }
    if (w.cardano) {
      if (w.cardano['1am']) return w.cardano['1am'];
      if (w.cardano.nightly) return w.cardano.nightly;
      if (w.cardano.lace) return w.cardano.lace;
      if (w.cardano.nami) return w.cardano.nami;
    }
    if (w['1am']) return w['1am'];
    return null;
  };

  const connectWallet = async () => {
    try {
      setError(null);
      setIsMockMode(false);
      setIsConnecting(true);
      
      let provider = getWalletProvider();
      
      let attempts = 0;
      while (!provider && attempts < 4) {
        await new Promise(r => setTimeout(r, 500));
        provider = getWalletProvider();
        attempts++;
      }
      
      if (!provider) {
        console.warn("No Midnight wallet extension found. Falling back to Demo/Simulation mode.");
        setWalletProvider({ mock: true, signData: async () => ({ signature: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('') }) });
        const mockAddr = "mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw";
        setAccount(mockAddr);
        setIsConnected(true);
        localStorage.setItem("payzk_wallet_connected", "true");
        setIsMockMode(true);
        return;
      }

      let connectedAPI;
      let userAddress = 'Connected (Unknown Address)';
      
      try {
        if (typeof provider.connect === 'function') {
          const network = import.meta.env.VITE_NETWORK || 'preview';
          connectedAPI = await provider.connect(network);
          if (connectedAPI && typeof connectedAPI.getUnshieldedAddress === 'function') {
            const { unshieldedAddress } = await connectedAPI.getUnshieldedAddress();
            userAddress = unshieldedAddress;
          }
        } else if (typeof provider.enable === 'function') {
          connectedAPI = await provider.enable();
        } else {
          connectedAPI = provider;
        }
      } catch (firstErr: any) {
        console.warn("Primary connection method failed...", firstErr);
        connectedAPI = provider; // bypass throw for corruption
      }

      setWalletProvider(connectedAPI);
      setAccount(userAddress);
      setIsConnected(true);
      localStorage.setItem("payzk_wallet_connected", "true");

    } catch (err: any) {
      console.error("Wallet connection failed", err);
      setError(`Wallet Error: ${err.message || String(err)}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletProvider(null);
    setAccount(null);
    setIsConnected(false);
    setError(null);
    setIsMockMode(false);
    setIsConnecting(false);
    localStorage.removeItem("payzk_wallet_connected");
  };

  return { walletProvider, account, isConnected, error, isMockMode, isConnecting, connectWallet, disconnectWallet, setError };
};
