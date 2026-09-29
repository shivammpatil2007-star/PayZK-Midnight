import { useState, useCallback } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  walletName: string | null;
  isConnecting: boolean;
  error: string | null;
  walletProvider: any | null;
}

export const useMidnight = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    walletName: null,
    isConnecting: false,
    error: null,
    walletProvider: null,
  });

  const connectLaceWallet = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      // Check for Midnight / Cardano Lace Wallet extension
      const midnightGlobal = (window as any).midnight;
      const cardanoGlobal = (window as any).cardano;
      
      const laceProvider = midnightGlobal?.lace || cardanoGlobal?.lace;

      if (laceProvider) {
        const api = await laceProvider.enable();
        const unusedAddresses = await api.getUnusedAddresses?.();
        const selectedAddr = unusedAddresses?.[0] || 'mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw';

        setWalletState({
          isConnected: true,
          address: selectedAddr,
          walletName: 'Lace Wallet',
          isConnecting: false,
          error: null,
          walletProvider: api,
        });
      } else {
        // Fallback demo session if Lace extension isn't detected
        setTimeout(() => {
          setWalletState({
            isConnected: true,
            address: 'mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw',
            walletName: 'Midnight Testnet Session',
            isConnecting: false,
            error: null,
            walletProvider: { mock: true, signData: async () => ({ signature: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('') }) },
          });
        }, 600);
      }
    } catch (err: any) {
      console.warn('[Wallet Connection Error]', err);
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: err?.message || 'Connection request rejected by user',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      walletName: null,
      isConnecting: false,
      error: null,
      walletProvider: null,
    });
  }, []);

  return {
    ...walletState,
    connectLaceWallet,
    disconnect,
  };
};
