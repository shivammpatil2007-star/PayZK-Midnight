import React, { useState } from 'react';
import { Lock, FileCheck2, Fingerprint } from 'lucide-react';

export const ProofStudio: React.FC<{ wallet: any | null }> = ({ wallet }) => {
  const [salary, setSalary] = useState<number>(5000);
  const [target, setTarget] = useState<number>(3000);
  const [isProving, setIsProving] = useState(false);
  const [proofData, setProofData] = useState<any>(null);

  const handleProve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsProving(true);
    setProofData(null);

    try {
      // Simulate Proof Generation Delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (salary >= target) {
        const hash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        const newProof = {
          timestamp: new Date().toISOString(),
          type: "INCOME_THRESHOLD",
          target,
          hash,
          status: "VALIDATED"
        };
        
        setProofData(newProof);

        // Local Storage for Audit Ledger
        const existing = JSON.parse(localStorage.getItem('payzk_proofs') || '[]');
        localStorage.setItem('payzk_proofs', JSON.stringify([newProof, ...existing]));

      } else {
        alert("Verification Failed: Your salary does not meet the target threshold.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating ZK Proof");
    } finally {
      setIsProving(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Fingerprint className="text-emerald-500" size={32} />
          Employee Proof Studio
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Generate zero-knowledge proofs locally. Your exact salary never leaves this device. 
          The cryptographic proof only reveals whether the threshold condition was met.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 border-emerald-500/20">
          <form onSubmit={handleProve} className="flex flex-col gap-6">
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Lock size={16} /> Private Salary (Witness)
                </label>
                <span className="text-xl font-bold text-white">${salary.toLocaleString()}/mo</span>
              </div>
              <input 
                type="range" 
                min="1000" max="20000" step="500"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  Target Threshold (Public)
                </label>
                <span className="text-xl font-bold text-white">${target.toLocaleString()}/mo</span>
              </div>
              <input 
                type="range" 
                min="1000" max="20000" step="500"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full accent-gray-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={!wallet || isProving}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Computing ZK Circuit...
                </>
              ) : (
                'Generate Cryptographic Proof'
              )}
            </button>
          </form>
        </div>

        {/* Live Proof Output */}
        <div className={`transition-all duration-500 ${proofData ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
          <div className="glass-panel p-8 h-full bg-emerald-950/20 border-emerald-500/30">
            <h3 className="text-lg font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <FileCheck2 size={20} />
              ZK Proof Output Card
            </h3>
            
            {proofData ? (
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Proof Hash (Zero-Knowledge)</div>
                  <div className="font-mono text-xs text-emerald-300 bg-black/40 p-3 rounded-lg border border-emerald-500/20 break-all">
                    {proofData.hash}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Public Commitment</div>
                    <div className="font-bold text-white">&gt; ${proofData.target}/mo</div>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Circuit Status</div>
                    <div className="font-bold text-emerald-400">VALIDATED</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                    Copy Payload
                  </button>
                  <button className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg text-sm font-medium transition-colors border border-emerald-500/30">
                    Verify On-Chain
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-gray-500 space-y-4">
                <Fingerprint size={48} className="opacity-20" />
                <p className="text-sm">Proof output will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
