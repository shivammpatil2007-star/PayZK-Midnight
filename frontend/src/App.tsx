import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { ProofStudio } from './components/ProofStudio';
import { VerifierSuite } from './components/VerifierSuite';

function App() {
  const { wallet, error } = useMidnight();

  return (
    <div className="app-container">
      <header className="header fade-in">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#paint0_linear)"/>
            <path d="M2 17L12 22L22 17" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8a2be2"/>
                <stop offset="1" stopColor="#00ffff"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-gradient">PayZK Protocol</span>
        </div>
        <WalletConnect wallet={wallet} error={error} />
      </header>

      <main className="dashboard-grid">
        <ProofStudio wallet={wallet} />
        <VerifierSuite />
      </main>
    </div>
  );
}

export default App;
