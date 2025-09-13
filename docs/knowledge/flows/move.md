# Move Flow

`Move` finalizes the transfer of a Genome from the Settlement Vault to the recipient’s Vault. It destroys the Genome in the Settlement Vault and creates a new Genome in the recipient’s Issued Vault.

## Steps
1. **Authorization:** The Owner or policy logic approves the transfer after `Ask2Move` conditions are satisfied.
2. **Call move:** The Appliance/backend calls `POST /move` with the pending request ID.
3. **Transfer execution:** Onli One destroys the Genome in the Settlement Vault and re-creates it in the recipient’s Vault.
4. **Receipt:** A receipt is recorded for audit; no public ledger is involved.

`Move` cannot be executed without a preceding `Ask2Move`.
