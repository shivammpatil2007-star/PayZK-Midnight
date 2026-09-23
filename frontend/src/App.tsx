import { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProofStudio } from './components/ProofStudio';
import { VerifierSuite } from './components/VerifierSuite';
import { AuditLedger } from './components/AuditLedger';
import { OverviewMetrics } from './components/OverviewMetrics';
import { AuthModal } from './components/AuthModal';
import { BrandAssets } from './components/BrandAssets';
function App() {
  const { walletProvider, account, error, isMockMode, isConnecting, connectWallet } = useMidnight();
  const [currentView, setCurrentView] = useState('overview');
  const [activeProofPayload, setActiveProofPayload] = useState<string | null>(null);

  // connect() is now triggered manually via AuthModal

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header 
          wallet={walletProvider} 
          address={account} 
          error={error} 
          isMockMode={isMockMode} 
          isConnecting={isConnecting} 
          onConnect={connectWallet} 
        />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'overview' && (
              <div className="glass-panel p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Welcome to PayZK</h2>
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
            {currentView === 'brand-assets' && <BrandAssets />}
          </div>
        </main>
      </div>

      {/* Authentication Modal Popup */}
      <AuthModal onConnectWallet={connectWallet} />
    </div>
  );
}

export default App;
