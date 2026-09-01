# PayZK: Confidential Income & Employment Verification Protocol

Traditional tenant screening, mortgage pre-approvals, and background checks require applicants to hand over raw pay stubs, bank statements, and tax returns. This exposes sensitive financial figures, heightens identity theft risks, and creates unauthorized data retention vulnerabilities. 

PayZK eliminates raw document disclosure by providing a zero-knowledge credential protocol built on Midnight. It enables individuals to cryptographically prove that their income satisfies a required threshold, aggregate earnings, and verify employment tenure without revealing exact salary numbers, bank balances, or personal identification details.

## Project Vision
Our vision is to revolutionize how credentials and financial qualifications are verified across industries. PayZK utilizes Midnight's data-protection blockchain to decouple *qualification* from *data exposure*. By using the Compact ZK smart contract language, the protocol enables **Strict Privacy Isolation**: an applicant's raw salary figures, exact tenure months, and other private witness data remain strictly on their local device during proof generation. The Midnight **Public Ledger State** stores only the resulting verification flags, the employer's public keys, and the exact target threshold that was met (disclosed transparently). This creates a system where a landlord or bank can see that a user met the criteria with 100% cryptographic certainty—"Proved without revealing your input"—but they never learn the underlying exact values.

## Smart Contract Deployment
- **Network:** Preview
- **Deployed contract ID:** [PENDING — run: npm run deploy -- --network preview]

## Key Features
- **Zero-Knowledge Income Verification:** A Compact smart contract circuit `prove_income_threshold` that verifies `salary >= target` locally without leaking the exact salary amount.
- **Confidential Employment Tenure Proof:** The `prove_employment_tenure` circuit ensures an applicant has sufficient work history length without revealing start dates or exact months worked.
- **Employee Proof Studio:** A React frontend where individuals can locally generate ZK proofs using their sensitive data. The inputs are never saved in React state, sent over a network, or persisted outside the runtime proving process.
- **Verifier Validation Suite:** A dashboard for landlords, banks, and HR departments to check the on-chain verification boolean flags in a single click using the Midnight Indexer.

## Future Scope
- Implement the `aggregate_multi_source_income` circuit to allow merging income from gig economy apps and traditional salaries.
- Implement `verify_employer_signature` to cryptographically link the income data to an authorized employer's public key.
- Enhance the UI to feature an HR Credential Issuer Portal and a personal Privacy Audit Log.
- Path to Mainnet deployment with optimized tDUST gas fees.

## Tech Stack
- **Smart Contract:** Compact (Zero-Knowledge programming language for Midnight)
- **Frontend:** React, TypeScript, Vite, CSS
- **Blockchain Integration:** `@midnight-ntwrk/midnight-js`, Midnight DApp Connector API
- **Testing & Tooling:** Vitest, Docker, WSL, `@midnight-ntwrk/compactc` (v0.5.1)

## Local Development (setup, run, test — step by step commands)

### Prerequisites
- Windows users must run these commands inside **WSL (Ubuntu/Debian)**.
- Node.js (v20+) and npm installed.
- Docker and Docker Compose installed and running.
- The `compact` compiler (v0.5.1) installed in your PATH (`~/.local/bin/compact`).

### 1. Compile the Smart Contract
Generate the zero-knowledge circuits and contract management files:
```bash
wsl ~/.local/bin/compact compile contracts/PayZK.compact managed/payzk
```

### 2. Run Tests
Execute the vitest test suite using the headless testkit:
```bash
wsl npm run test
```

### 3. Start Local Devnet (Optional, for local testing)
If you want to run a local node instead of the Preview network:
```bash
wsl docker compose up -d
```

### 4. Run the Frontend
The frontend connects to the Midnight Preview Network and requires a compatible wallet (Lace or 1AM Wallet) set to `Preview`.
```bash
npm run frontend:dev
```
Or to build for production:
```bash
npm run frontend:build
```

### 5. Deploy to Preview Network
To deploy the contract yourself (requires a funded wallet on the Preview network):
```bash
wsl npm run deploy -- --network preview
```
