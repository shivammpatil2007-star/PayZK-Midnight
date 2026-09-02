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
            <thead className="bg-white/5 border-b border-white/10 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Target Met</th>
                <th className="px-6 py-4 font-medium">Proof Hash</th>
                <th className="px-6 py-4 font-medium">Status</th>
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
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(proof.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {proof.type}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-400">
                      &gt; ${proof.target}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-amber-300/80 max-w-[200px] truncate">
                      {proof.hash}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
