import React from 'react';

export const VerifierSuite: React.FC = () => {
  return (
    <div className="glass-panel fade-in" style={{ padding: '2rem', animationDelay: '0.2s', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Verifier Validation Suite</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Check on-chain cryptographic proofs in real-time.
      </p>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Network</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Preview Testnet</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contract ID</span>
            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#fff' }}>
              {import.meta.env.VITE_CONTRACT_ADDRESS ? `${import.meta.env.VITE_CONTRACT_ADDRESS.substring(0, 16)}...` : 'Not deployed'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Applicant</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>--</span>
          </div>
        </div>

        <button className="btn-primary" style={{ marginTop: 'auto' }} disabled={true}>
          Query Public Ledger State
        </button>
      </div>
    </div>
  );
};
