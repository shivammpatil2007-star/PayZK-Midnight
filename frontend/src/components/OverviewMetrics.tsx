import React from 'react';

export const OverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-6 animate-float" style={{ animationDelay: '0s' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Privacy Score</h3>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-emerald-500 to-cyan-500 drop-shadow-sm">100%</div>
        <p className="text-xs text-gray-500 mt-2 font-medium">Zero-Knowledge Protocol Active</p>
      </div>
      <div className="glass-panel p-6 animate-float" style={{ animationDelay: '1s' }}>
        <h3 className="text-gray-400 text-sm font-medium mb-2">Total Proofs Issued</h3>
        <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-emerald-500 to-cyan-500 drop-shadow-sm">2,143</div>
        <p className="text-xs text-gray-500 mt-2 font-medium">+12% this week</p>
      </div>
      <div className="glass-panel p-6 animate-float" style={{ animationDelay: '2s' }}>
        <h3 className="text-gray-400 text-sm font-medium mb-2">Active Verifications</h3>
        <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-emerald-500 to-cyan-500 drop-shadow-sm">45</div>
        <p className="text-xs text-gray-500 mt-2 font-medium">Currently processing</p>
      </div>
    </div>
  );
};
