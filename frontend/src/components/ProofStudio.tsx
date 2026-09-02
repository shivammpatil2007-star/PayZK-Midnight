import React, { useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Witnesses } from '../../managed/payzk/contract/index.js';

export const ProofStudio: React.FC<{ wallet: any | null }> = ({ wallet }) => {
  const salaryRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  
  const [isProving, setIsProving] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleProve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    const salary = parseInt(salaryRef.current?.value || "0", 10);
    const target = parseInt(targetRef.current?.value || "0", 10);

    setIsProving(true);
    setTxHash(null);

    try {
      // In a full integration, you would initialize the MidnightProvider and Contract:
      // const providers = await getProviders(wallet);
      // const payZkContract = new Contract(providers, contractAddress);
      
      // Since this is a hackathon MVP, we simulate the actual DApp connector flow for the user experience,
      // demonstrating exactly where the private witnesses would be constructed and passed.
      
      // Simulated Private Witnesses matching our contract
      const privateWitnesses: Witnesses<any> = {
        local_salary: BigInt(salary),
        local_target: BigInt(target),
        local_tenure: BigInt(0) // Default for this specific circuit
      } as any;

      console.log("[Privacy Sandbox] Constructed private witnesses locally:", privateWitnesses);
      
      // Simulate proving delay over network
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      if (salary >= target) {
        setTxHash("tx_hash_" + Math.random().toString(36).substring(2, 15));
      } else {
        alert("Verification Failed: Your private salary does not meet the target threshold.");
      }
      
    } catch (err: any) {
      console.error(err);
      alert("An error occurred during proof generation.");
    } finally {
      setIsProving(false);
      // Immediately wipe the refs from memory for strict privacy isolation
      if (salaryRef.current) salaryRef.current.value = "";
    }
  };

  return (
    <div className="glass-panel fade-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Employee Proof Studio</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Generate zero-knowledge proofs locally. Your exact salary never leaves this device.
      </p>

      <form onSubmit={handleProve} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            Private Salary (Witness)
          </label>
          <input 
            type="number" 
            ref={salaryRef} 
            placeholder="e.g. 85000" 
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            Target Threshold (Public)
          </label>
          <input 
            type="number" 
            ref={targetRef} 
            placeholder="e.g. 50000" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={!wallet || isProving}
          style={{ marginTop: '1rem' }}
        >
          {isProving ? 'Generating ZK Proof...' : 'Prove Income Threshold'}
        </button>
      </form>

      {txHash && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,255,255,0.05)', border: '1px solid rgba(0,255,255,0.2)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Proof Successfully Submitted</h3>
          <p style={{ fontSize: '0.8rem', wordBreak: 'break-all', fontFamily: 'monospace' }}>Tx: {txHash}</p>
        </div>
      )}
    </div>
  );
};
