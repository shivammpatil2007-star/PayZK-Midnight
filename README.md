# PayZK: Confidential Income & Employment Verification

![CI/CD Pipeline](https://github.com/shivammpatil2007-star/PayZK-Midnight/actions/workflows/ci-cd.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Preprod Deployment](https://img.shields.io/badge/Preprod-Live-success)

PayZK is a Zero-Knowledge Proof (ZKP) protocol built on the **Midnight Network**. It allows users to cryptographically prove their income meets specific thresholds, or that they meet certain employment tenure requirements, *without ever revealing their exact salary or start dates*. 

By separating public on-chain state (verification status) from private witness data (actual salary), PayZK ensures absolute privacy for employees while providing unquestionable cryptographic guarantees to employers, landlords, or financial institutions.

## 🌐 Product X (Twitter) Profile
Follow our latest updates on X: [PayZK_Midnight](https://x.com/PayZK_Midnight)

## 🚀 Live Preprod Deployment
- **Frontend App**: [https://payzk-midnight-frontend.vercel.app](https://payzk-midnight-frontend.vercel.app) *(Update with your actual Vercel URL)*
- **Midnight Contract Address**: `mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw`
- **Demo Video**: [Watch the MVP Demo](https://youtube.com/...) *(Update with your actual demo video link)*

## 🏗️ Architecture

```mermaid
graph LR
    A[User Wallet (Lace/Nightly)] -->|Connects to| B[Vite React Frontend]
    B -->|Provides Private Witnesses| C[Midnight Network DApp Connector]
    C -->|Generates ZK Proof| D[PayZK.compact Smart Contract]
    D -->|Updates Public State| E[Midnight Blockchain]
    E -.->|Reads Verified Status| B
```

### The Smart Contract (`PayZK.compact`)
The core logic resides in a Compact smart contract that utilizes **Private Witnesses**:
- `local_salary()`: Private data (never leaves the user's device).
- `local_target()`: The threshold being checked against.
- `local_tenure()`: Private employment tenure.

The contract executes ZK circuits (like `prove_income_threshold`) that assert the private data meets the requirements and then publicly discloses *only* the success of the verification and the target met.

## 🛠️ Quickstart Guide

### Prerequisites
- Node.js 22+ (Strictly required for Vite 8 compatibility)
- Midnight Wallet Extension (e.g., Lace, Nightly) running on the Midnight Testnet/Preprod network.

### 1. Compile the Smart Contract
Before running the application, you need to compile the `.compact` contract to generate the TypeScript bindings.
```bash
npm run compact:compile
```

### 2. Run the Frontend Locally
The frontend is a Vite + React application.
```bash
cd frontend
npm install
npm run dev
```

### 3. Run the Automated Tests
We use Vitest to ensure the core application logic remains stable.
```bash
npm run test
```

### 4. Deploy the Contract (Preprod)
Use the included deployment script to deploy the compiled contract to the Midnight Preprod network.
```bash
npm run deploy
```
*(Make sure to configure your `.env` with your `WALLET_SEED` before deploying).*

## 📖 Usage
1. Connect your Midnight Wallet via the web interface.
2. Input your private financial data (e.g., Salary) and the requested threshold.
3. Generate the Zero-Knowledge Proof locally in your browser.
4. Submit the proof to the network. Once confirmed, your verified status updates on-chain without exposing your data!
