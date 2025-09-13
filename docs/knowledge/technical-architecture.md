# Technical Architecture

## Vault System (five types)
- **Treasury Vault** — minted reserve.  
- **Inventory Vault** — ready for distribution.  
- **Issued Vault** — currently owned by users.  
- **Settlement Vault** — policy-gated staging for movement.  
- **Blacklisted Vault** — suspended/revoked assets.

## Roles
**Owner** (authorizes movement), **Issuer** (mints series/denomination), **Developer** (builds Appliances), **Oracle** (optional reporter), **Onli One** (P2P network that moves Genomes and records receipts).

## Receipts & Privacy
**Receipts** are immutable transfer records for audit/reconciliation; **Vault contents are never published** on a public ledger.
