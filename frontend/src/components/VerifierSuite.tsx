import React, { useState } from 'react';
import { SearchCode, FileKey2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const VerifierSuite: React.FC = () => {
  const [proofInput, setProofInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  const handleVerify = async () => {
    if (!proofInput) return;
    setIsValidating(true);
    setResult(null);

    try {
      // Simulate on-chain verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simple mock logic: if the proof string is long enough, it's valid
      setResult(proofInput.length > 20);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <SearchCode className="text-cyan-500" size={32} />
          Verifier Suite
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Instantly cryptographically verify applicant proofs against the Midnight public ledger.
          Requires zero access to the underlying sensitive data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 border-cyan-500/20">
          <div className="flex flex-col gap-4 h-full">
            <label className="text-sm font-medium text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <FileKey2 size={16} /> Paste ZK Proof Payload
            </label>
            <textarea
              value={proofInput}
              onChange={(e) => setProofInput(e.target.value)}
              placeholder="0x..."
              className="flex-1 min-h-[200px] w-full bg-black/30 border border-white/10 rounded-xl p-4 text-cyan-100 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            ></textarea>

            <button
              onClick={handleVerify}
              disabled={isValidating || !proofInput}
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Querying Indexer...
                </>
              ) : (
                'Verify Cryptographic Proof'
              )}
            </button>
          </div>
        </div>

        {/* Verification Result Receipt */}
        <div className={`transition-all duration-500 ${result !== null ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale pointer-events-none'}`}>
          <div className="glass-panel p-8 h-full bg-cyan-950/20 border-cyan-500/30">
            <h3 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              Validation Receipt
            </h3>

            {result !== null ? (
              <div className="space-y-6">
                <div className={`flex items-center gap-4 p-4 rounded-xl border ${result ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  {result ? (
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  ) : (
                    <ShieldAlert size={32} className="text-red-500" />
                  )}
                  <div>
                    <h4 className={`font-bold ${result ? 'text-emerald-400' : 'text-red-400'}`}>
                      {result ? 'CRYPTOGRAPHICALLY VERIFIED' : 'VERIFICATION FAILED'}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {result ? 'The on-chain boolean flag confirms the threshold condition is met.' : 'The proof is invalid or malformed.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ledger Block</span>
                    <span className="text-white font-mono">2,845,912</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract ID</span>
                    <span className="text-cyan-300 font-mono text-xs max-w-[200px] truncate">
                      {import.meta.env.VITE_CONTRACT_ADDRESS || 'mn_addr_preview1zwxqm3yt...'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp</span>
                    <span className="text-white">{new Date().toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                  Export Receipt (PDF)
                </button>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-gray-500 space-y-4">
                <SearchCode size={48} className="opacity-20" />
                <p className="text-sm">Receipt will appear upon validation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
