import React from 'react';

export const OverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Privacy Score</h3>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="text-4xl font-bold text-emerald-400">100%</div>
        <p className="text-xs text-gray-500 mt-2">Zero-Knowledge Protocol Active</p>
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Total Proofs Issued</h3>
        <div className="text-4xl font-bold text-indigo-400">2,143</div>
        <p className="text-xs text-gray-500 mt-2">+12% this week</p>
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Active Verifications</h3>
        <div className="text-4xl font-bold text-cyan-400">45</div>
        <p className="text-xs text-gray-500 mt-2">Currently processing</p>
      </div>
    </div>
  );
};
