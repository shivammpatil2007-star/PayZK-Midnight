import { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProofStudio } from './components/ProofStudio';
import { VerifierSuite } from './components/VerifierSuite';
import { AuditLedger } from './components/AuditLedger';
import { OverviewMetrics } from './components/OverviewMetrics';
import { WalletModal } from './components/WalletModal';
function App() {
  const { walletProvider, isConnected, address, error, isConnecting, connectLaceWallet } = useMidnight();
  const [currentView, setCurrentView] = useState('overview');
  const [activeProofPayload, setActiveProofPayload] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header 
          wallet={walletProvider} 
          address={address} 
          error={error} 
          isMockMode={false} 
          isConnecting={isConnecting} 
          onConnect={() => setIsWalletModalOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'overview' && (
              <div className="glass-panel p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-500 drop-shadow-lg tracking-tight">Welcome to PayZK</h2>
                <OverviewMetrics />
              </div>
            )}
            
            {currentView === 'employee' && (
              <ProofStudio 
                wallet={walletProvider} 
                setActiveProofPayload={setActiveProofPayload}
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === 'verifier' && (
              <VerifierSuite 
                activeProofPayload={activeProofPayload}
              />
            )}
            {currentView === 'ledger' && <AuditLedger />}
          </div>
        </main>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onSelectLace={connectLaceWallet} 
        isConnecting={isConnecting} 
      />
    </div>
  );
}

export default App;
