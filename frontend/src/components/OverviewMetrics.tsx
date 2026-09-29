import React from 'react';

export const OverviewMetrics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Contract Telemetry Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active Midnight Contract (CA)</div>
              <div className="text-sm font-mono text-slate-200 break-all select-all">
                mn_contract_preview1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Valid Testnet Deployment
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Privacy Score</h3>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">100%</div>
        <p className="text-xs text-gray-500 mt-2">Zero-Knowledge Protocol Active</p>
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Total Proofs Issued</h3>
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">2,143</div>
        <p className="text-xs text-gray-500 mt-2">+12% this week</p>
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Active Verifications</h3>
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">45</div>
        <p className="text-xs text-gray-500 mt-2">Currently processing</p>
      </div>
      </div>
    </div>
  );
};
