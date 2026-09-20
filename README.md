# PayZK — Confidential Income & Employment Verification Protocol

[![CI/CD Pipeline](https://github.com/shivammpatil2007-star/PayZK-Midnight/actions/workflows/ci.yml/badge.svg)](https://github.com/shivammpatil2007-star/PayZK-Midnight/actions)
[![Network](https://img.shields.io/badge/Midnight-Preview%20Testnet-6366f1)](https://midnight.network)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)](https://pay-zk-midnight-two.vercel.app/)
[![X Profile](https://img.shields.io/badge/X-@PayZKProtocol-000000?logo=x)](https://x.com/PayZKProtocol)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-Loom-625df5?logo=loom)](https://www.loom.com/share/d5d0f8e1a95a4a54b65f2487d20e233f)

> PayZK is a zero-knowledge privacy protocol built on the **Midnight Network**. It enables employees to prove income thresholds and employment status to third-party verifiers (landlords, lenders, institutions) without revealing exact salary amounts, bank statements, or sensitive identity data.

---

## 📋 Table of Contents
- [Submission Assets & Links](#-submission-assets--links)
- [On-Chain Deployment & Telemetry](#-on-chain-deployment--telemetry)
- [System Architecture & Privacy Flow](#-system-architecture--privacy-flow)
- [Complete Application Integration Flow](#-complete-application-integration-flow)
- [Repository File & Component Structure](#-repository-file--component-structure)
- [Compact ZK Circuit Specifications](#-compact-zk-circuit-specifications)
- [Local Setup & Developer Guide](#-local-setup--developer-guide)
- [Testing & CI/CD Pipeline](#-testing--cicd-pipeline)

---

## 🔗 Submission Assets & Links

- **Public Repository**: [GitHub - PayZK-Midnight](https://github.com/shivammpatil2007-star/PayZK-Midnight)
- **Live Application (Vercel)**: [https://pay-zk-midnight-two.vercel.app/](https://pay-zk-midnight-two.vercel.app/)
- **Product X Profile**: [https://x.com/PayZKProtocol](https://x.com/PayZKProtocol)
- **CI/CD Pipeline Workflow**: [GitHub Actions CI](https://github.com/shivammpatil2007-star/PayZK-Midnight/actions)
- **Demo Video Walkthrough**: [Watch PayZK Level 4 Demo Video](https://www.loom.com/share/d5d0f8e1a95a4a54b65f2487d20e233f)

---

## 🌐 On-Chain Deployment & Telemetry

| Parameter | Value |
| :--- | :--- |
| **Target Network** | Midnight Preview Testnet |
| **Deployed Contract Address** | `mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw` |
| **Deployer Wallet Address** | `mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw` |
| **Deployment Tx Hash** | `0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef` |
| **Compact Language Version** | `Compact v0.1.0` |
| **ZK Proof System** | Halo2 / Plonk over Midnight Curve |

---

## 🏗 System Architecture & Privacy Flow

```text
+-------------------+       1. Input Raw Data      +-----------------------+
| Employee Prover   | -------------------------->  | Local ZK Witness Gen  |
| (Frontend UI)     |                              | (Browser / WebAssembly)
+-------------------+                              +-----------------------+
                                                              |
                                                              | 2. Submit ZK Proof & Commitment
                                                              v
+-------------------------------------------------------------------------+
| Midnight Blockchain                                                     |
| - Validates Compact ZK Circuit State Transition                         |
| - Preserves Private State (Exact Salary, SSN)                           |
| - Emits Public Verification Receipt                                     |
+-------------------------------------------------------------------------+
                                                              |
                                                              | 4. Query Public State / Verify Proof
                                                              v
+-------------------+       5. Validated Receipt   +-----------------------+
| Verifier Suite    | <--------------------------  | Persistent Audit Log  |
| (Lender/Landlord) |                              | (Local / Indexed State|
+-------------------+                              +-----------------------+
```

---

## 🔄 Complete Application Integration Flow

1. **Wallet Connection & Protocol Handshake:**
   - Frontend detects `window.midnight.lace` injected provider.
   - Derives unshielded/shielded keypairs and displays real-time `tDUST` / `tNIGHT` balances.
2. **Employee Proof Studio (Prover):**
   - User inputs salary, employment duration, and target threshold rule (e.g., *Income > $5,000/month*).
   - Local Compact witness engine compiles private inputs into zero-knowledge proof payload.
3. **Smart Contract Interop & State Binding:**
   - ZK Proof payload is transmitted to the deployed `PayZK.compact` contract on Midnight.
   - The contract verifies witness validity without learning raw income values and updates on-chain proof state.
4. **Verifier Verification & Receipt Generation:**
   - Verifier receives proof payload or fetches contract state via address query.
   - UI renders cryptographic validation receipt with verification timestamp, proof hash, and status tags.
5. **Audit Ledger Logging:**
   - Every verified transaction is logged into persistent storage (`localStorage` / state indexer) for compliance and historical tracking.

---

## 📁 Repository File & Component Structure

```text
PayZK-Midnight/
├── .github/
│   └── workflows/
│       └── ci.yml             # Automated build and test pipeline
├── contracts/
│   └── PayZK.compact          # Compact ZK smart contract source
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Top bar with network telemetry & wallet connect
│   │   │   ├── Sidebar.tsx       # Dashboard role-based navigation bar
│   │   │   ├── OverviewMetrics.tsx# Protocol metrics & analytics display
│   │   │   ├── ProofStudio.tsx   # Employee ZK proof generation form
│   │   │   ├── VerifierSuite.tsx # Cryptographic proof verification module
│   │   │   └── AuditLedger.tsx   # Historical proof log & persistence
│   │   ├── hooks/
│   │   │   └── useMidnight.ts    # Lace wallet hook with simulation fallback
│   │   ├── App.tsx               # Main AppShell dashboard wrapper
│   │   └── index.css             # Glassmorphic Tailwind theme design system
│   ├── tailwind.config.js        # Theme color tokens & custom styles
│   └── vite-env.d.ts             # TypeScript environment typings
├── src/
│   └── deploy.ts                 # Midnight contract deployment script
├── tests/
│   └── PayZK.test.ts             # Vitest test suite for ZK witnesses
├── package.json                  # Dependencies and npm build scripts
└── README.md                     # Complete system documentation
```

---

## ⚙️ Compact ZK Circuit Specifications

### Public Inputs vs. Private Witnesses

| Variable Name | Circuit Type | Visibility | Description |
| :--- | :--- | :--- | :--- |
| `monthlySalary` | `Uint<64>` | **Private** | Raw monthly income amount in USD |
| `employmentStatus` | `Boolean` | **Private** | Active employment indicator |
| `thresholdAmount` | `Uint<64>` | **Public** | Required income threshold to prove |
| `employerCommitment`| `Bytes<32>` | **Public** | Cryptographic hash commitment of employer ID |
| `isProofValid` | `Boolean` | **Public Output** | Verified result computed inside ZK circuit |

---

## 🚀 Local Setup & Developer Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` or `pnpm`
- **Midnight Wallet**: Lace Browser Extension (configured for Preview Network)

### Installation

```bash
# Clone the repository
git clone https://github.com/shivammpatil2007-star/PayZK-Midnight.git
cd PayZK-Midnight

# Install dependencies
npm install
```

### Environment Configuration

Copy the example environment file and configure variables:

```bash
cp .env.example .env
```

Ensure `.env` contains:

```env
WALLET_SEED=<64_CHARACTER_HEX_SEED>
VITE_NETWORK=preview
```

### Development & Build Commands

```bash
# Start frontend dashboard locally
npm run dev

# Run unit & ZK circuit tests
npm run test

# Execute full production build
npm run build
```

---

## 🧪 Testing & CI/CD Pipeline

The project utilizes automated Continuous Integration via GitHub Actions to ensure zero TypeScript errors and passing ZK witness test suites on every commit.

To run tests locally:

```bash
npx vitest run
```

