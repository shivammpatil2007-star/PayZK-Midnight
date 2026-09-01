# PayZK: Confidential Income & Employment Verification Protocol

![CI/CD](https://github.com/shivammpatil2007-star/PayZK-Midnight/actions/workflows/ci.yml/badge.svg)

- **GitHub Repository:** https://github.com/shivammpatil2007-star/PayZK-Midnight
- **Live dApp Demo:** `[PASTE_VERCEL_OR_NETLIFY_URL_HERE]`
- **Product X Profile:** https://x.com/PayZK_Protocol
- **Demo Video:** `[PASTE_LOOM_OR_YOUTUBE_LINK_HERE]`

Traditional tenant screening, mortgage pre-approvals, and background checks require applicants to hand over raw pay stubs, bank statements, and tax returns. This exposes sensitive financial figures, heightens identity theft risks, and creates unauthorized data retention vulnerabilities. 

PayZK eliminates raw document disclosure by providing a zero-knowledge credential protocol built on Midnight. It enables individuals to cryptographically prove that their income satisfies a required threshold, aggregate earnings, and verify employment tenure without revealing exact salary numbers, bank balances, or personal identification details.

## Smart Contract Deployment

- **Network:** Midnight Preview Testnet
- **Deployed Contract ID:** `mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw`

## Privacy Architecture

| Data Point | State Type | Description |
| :--- | :--- | :--- |
| **Salary Amount** | Private Witness | Actual salary figure. Strictly isolated locally; NEVER leaves the user's device. |
| **Employment Tenure** | Private Witness | Exact months employed. Remains entirely off-chain during ZK proof generation. |
| **Threshold Met** | Public Ledger State | The target threshold (e.g., $50k) disclosed *only* after being proven met. |
| **Verification Flag** | Public Ledger State | Boolean value (`1`/`0`) confirming successful cryptographic verification. |

## Key Features
- **Zero-Knowledge Income Verification:** A Compact smart contract circuit `prove_income_threshold` that verifies `salary >= target` locally without leaking the exact salary amount.
- **Confidential Employment Tenure Proof:** The `prove_employment_tenure` circuit ensures an applicant has sufficient work history length without revealing start dates or exact months worked.
- **Employee Proof Studio:** A React frontend where individuals can locally generate ZK proofs using their sensitive data. The inputs are never saved in React state, sent over a network, or persisted outside the runtime proving process.
- **Verifier Validation Suite:** A dashboard for landlords, banks, and HR departments to check the on-chain verification boolean flags in a single click using the Midnight Indexer.

## Local Setup & Usage Guide

### Prerequisites
- Windows users must run these commands inside **WSL (Ubuntu/Debian)**.
- Node.js (v20+) and npm installed.
- Docker and Docker Compose installed and running.
- The `compact` compiler (v0.5.1) installed in your PATH (`~/.local/bin/compact`).

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install
```

### 2. Compile the Smart Contract
Generate the zero-knowledge circuits and contract management files:
```bash
wsl ~/.local/bin/compact compile contracts/PayZK.compact managed/payzk
```

### 3. Run the Frontend
The frontend connects to the Midnight Preview Network and requires a compatible wallet (Lace or 1AM Wallet) set to `Preview`.
```bash
cd frontend
npm run dev
```

## Future Scope
- Implement the `aggregate_multi_source_income` circuit to allow merging income from gig economy apps and traditional salaries.
- Implement `verify_employer_signature` to cryptographically link the income data to an authorized employer's public key.
- Enhance the UI to feature an HR Credential Issuer Portal and a personal Privacy Audit Log.
- Path to Mainnet deployment with optimized tDUST gas fees.
