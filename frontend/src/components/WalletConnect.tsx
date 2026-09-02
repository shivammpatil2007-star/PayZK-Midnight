import React from 'react';

export const WalletConnect: React.FC<{ wallet: any | null, error: string | null }> = ({ wallet, error }) => {
  if (error) {
    return (
      <div className="status-badge" style={{ borderColor: '#ff4757', color: '#ff4757' }}>
        <div className="status-dot"></div>
        {error}
      </div>
    );
  }

  return (
    <div className={`status-badge ${wallet ? 'connected' : ''}`}>
      <div className="status-dot"></div>
      {wallet ? 'Connected to Preview' : 'Waiting for Wallet...'}
    </div>
  );
};
