import React, { useRef, useState, useEffect } from 'react';
// Replaced DAppConnectorWalletAPI with any
// We would import the providers and contract client here, but for this step we will mock the connection 
// if it's not fully wired or we use the injected wallet to build the transaction.

export const ProofStudio: React.FC<{
  wallet: any | null;
}> = ({ wallet }) => {
  const salaryRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  
  const [isProving, setIsProving] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [onChainState, _setOnChainState] = useState<{
    latest_verified_user: string,
    latest_target_met: string,
    is_income_verified: string
  } | null>(null);

  // Fetch state from Indexer (mocked for preview network URL)
  useEffect(() => {
    const fetchState = async () => {
      // In a real app we'd use @midnight-ntwrk/midnight-js indexer provider
      // For now we just poll a placeholder or leave it empty if contract not deployed
    };
    if (wallet) {
      fetchState();
      const interval = setInterval(fetchState, 5000);
      return () => clearInterval(interval);
    }
  }, [wallet]);

  const handleProve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;

    try {
      setIsProving(true);
      
      // We read from refs so private data is not in React state
      const salary = salaryRef.current?.value;
      const target = targetRef.current?.value;
      
      if (!salary || !target) throw new Error("Please enter salary and target");

      // Here we would call the contract:
      // const tx = await payzkContract.prove_income_threshold(address);
      // await tx.prove();
      // await tx.submit();
      
      // MOCKing the delay of zero-knowledge proof generation locally
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTxHash("mock_tx_hash_for_preview_network");
      
      // Clear refs immediately after proof generation so it doesn't linger
      if (salaryRef.current) salaryRef.current.value = '';
      if (targetRef.current) targetRef.current.value = '';

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Proof failed');
    } finally {
      setIsProving(false);
    }
  };

  if (!wallet) return <div className="proof-studio-empty">Please connect wallet to access Proof Studio</div>;

  return (
    <div className="proof-studio">
      <h2>Employee Proof Studio</h2>
      <p className="privacy-label">🛡️ Proved without revealing your input</p>
      
      <form onSubmit={handleProve}>
        <div className="input-group">
          <label>Actual Salary (Private)</label>
          <input type="number" ref={salaryRef} placeholder="e.g. 80000" required />
          <small>Remains strictly on your device.</small>
        </div>
        
        <div className="input-group">
          <label>Target Threshold to Prove (Public)</label>
          <input type="number" ref={targetRef} placeholder="e.g. 50000" required />
          <small>This will be disclosed on-chain.</small>
        </div>
        
        <button type="submit" disabled={isProving}>
          {isProving ? 'Generating ZK Proof locally...' : 'Generate & Submit Proof'}
        </button>
      </form>

      {txHash && (
        <div className="success-banner">
          Proof submitted successfully! Transaction: {txHash}
        </div>
      )}

      <div className="verifier-suite">
        <h3>Verifier Validation Suite</h3>
        <p>Current Public State on Midnight Preview Network:</p>
        <pre>
          {JSON.stringify(onChainState || { status: 'Fetching from Indexer...' }, null, 2)}
        </pre>
      </div>
    </div>
  );
};
