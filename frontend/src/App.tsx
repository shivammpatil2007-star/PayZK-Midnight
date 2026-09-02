import { useState, useEffect } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProofStudio } from './components/ProofStudio';
import { VerifierSuite } from './components/VerifierSuite';
import { AuditLedger } from './components/AuditLedger';

function App() {
  const { wallet, address, error, isMockMode, connect } = useMidnight();
  const [currentView, setCurrentView] = useState('overview');

  useEffect(() => {
    connect();
  }, []); // Connect on mount

  return (
    <div className="flex h-screen overflow-hidden bg-[#090d16]">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header wallet={wallet} address={address} error={error} isMockMode={isMockMode} onConnect={connect} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'overview' && (
              <div className="glass-panel p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Welcome to PayZK</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Privacy Score</h3>
                    <div className="text-4xl font-bold text-emerald-400">100%</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Proofs Issued</h3>
                    <div className="text-4xl font-bold text-indigo-400">0</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Active Verifications</h3>
                    <div className="text-4xl font-bold text-cyan-400">0</div>
                  </div>
                </div>
              </div>
            )}
            
            {currentView === 'employee' && <ProofStudio wallet={wallet} />}
            {currentView === 'verifier' && <VerifierSuite />}
            {currentView === 'audit' && <AuditLedger />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
