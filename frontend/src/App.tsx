import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { ProofStudio } from './components/ProofStudio';
import './App.css';

function App() {
  const walletInfo = useMidnight();

  return (
    <div className="app-container">
      <header>
        <h1>PayZK</h1>
        <p>Confidential Income & Employment Verification</p>
        <WalletConnect walletInfo={walletInfo} />
      </header>

      <main>
        <ProofStudio wallet={walletInfo.wallet} />
      </main>
      
      <footer>
        <p>Built for INTO the Midnight — SPPU</p>
      </footer>
    </div>
  );
}

export default App;
