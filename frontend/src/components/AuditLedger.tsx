// Component: Audit Ledger
import React, { useEffect, useState } from 'react';
import { FileKey, History } from 'lucide-react';

export const AuditLedger: React.FC = () => {
  const [proofs, setProofs] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('payzk_proofs') || '[]');
    setProofs(saved);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <History className="text-amber-500" size={32} />
          Proof Audit Ledger
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Historical log of all locally generated cryptographic proofs. 
          This data is stored purely in your local browser state and is never transmitted.
        </p>
      </div>

      <div className="glass-panel border-amber-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 border-b border-white/10 text-gray-400">
              <tr>
                <th className="px-6 py-5 font-medium tracking-wide">Timestamp</th>
                <th className="px-6 py-5 font-medium tracking-wide">Type</th>
                <th className="px-6 py-5 font-medium tracking-wide">Target Met</th>
                <th className="px-6 py-5 font-medium tracking-wide">Proof Hash</th>
                <th className="px-6 py-5 font-medium tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {proofs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <FileKey size={32} className="mx-auto mb-3 opacity-20" />
                    No cryptographic proofs generated yet.
                  </td>
                </tr>
              ) : (
                proofs.map((proof, i) => (
                  <tr key={i} className="hover:bg-amber-500/10 transition-colors cursor-default">
                    <td className="px-6 py-5 text-gray-300">
                      {new Date(proof.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-white">
                      {proof.type}
                    </td>
                    <td className="px-6 py-5 font-bold text-emerald-400">
                      &gt; ${proof.target}
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-amber-300/80 max-w-[200px] truncate">
                      {proof.hash}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-tight">
                        {proof.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
