import React from 'react';
import { useMidnight } from '../hooks/useMidnight';

export const WalletConnect: React.FC<{
  walletInfo: ReturnType<typeof useMidnight>
}> = ({ walletInfo }) => {
  const { wallet, address, error, connect, disconnect } = walletInfo;

  return (
    <div className="wallet-connect">
      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}
      
      {!wallet ? (
        <button onClick={connect} className="connect-btn">
          Connect Midnight Wallet (Preview Network)
        </button>
      ) : (
        <div className="connected-info">
          <span className="network-badge">🟢 Preview Network</span>
          <span className="address-badge">
            {address?.slice(0, 8)}...{address?.slice(-8)}
          </span>
          <button onClick={disconnect} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};
