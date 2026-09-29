# PayZK Protocol - Usage Guide

## Overview
PayZK is a Zero-Knowledge Income & Employment Verification Protocol built on the Midnight Network. It enables individuals to prove financial thresholds (e.g., salary > $50k) to verifiers without revealing exact income or sensitive personal identifiers.

---

## 1. Prerequisites & Environment Setup
- Node.js >= v18.x
- npm or pnpm
- A Web3 Browser Wallet (e.g., Lace / Midnight Preview Wallet)

---

## 2. On-Chain Smart Contract Details
- **Network:** Midnight Preview Testnet (Preprod)
- **Contract Address (CA):** `mn_contract_preview1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`
- **Deployer Address:** `mn_addr_preview1zwxqm3yt970s99gvrn99gz3fzt7y8prazgl4k3twl6cmxrgwk0fsv2tprw`
- **Compact Circuit Source:** `contracts/PayZK.compact`

---

## 3. Web dApp Workflow

### Step A: Connect Wallet
1. Open the live dApp: [https://pay-zk-midnight-two.vercel.app](https://pay-zk-midnight-two.vercel.app)
2. Click **Connect Wallet** in the top navigation bar to establish session context.

### Step B: Generate ZK Proof (Employee Studio)
1. Navigate to **Employee Studio**.
2. Set your **Private Salary (Witness)** slider (e.g., `$85,000`).
3. Set the **Target Threshold (Public)** slider (e.g., `$50,000`).
4. Click **Generate Cryptographic Proof**. The local ZK circuit synthesizes proof witness metadata without exposing your exact salary.
5. Click **Copy Payload** or **Verify On-Chain**.

### Step C: Verify Proof (Verifier Suite)
1. Navigate to **Verifier Suite**.
2. Paste or load the 64-character Proof Hash.
3. Click **Verify Cryptographic Proof**. The app checks the state on the Midnight Preview Testnet and displays the **CRYPTOGRAPHICALLY VERIFIED** status badge.
4. Optionally click **Export Receipt (PDF)** to save the compliance receipt.

### Step D: Inspect Audit Trail (Proof Audit Ledger)
1. Navigate to **Proof Audit Ledger** to view historical proofs, timestamps, and Midnight block numbers.
