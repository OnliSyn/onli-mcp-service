# Ask2Move Flow

`Ask2Move` is a request to move a Genome into the Settlement Vault. It initiates the transfer process but does not complete it.

## Purpose
- Ensure that policy conditions (e.g., compliance, settlement locks) are evaluated before a transfer.
- Allow the Owner to authorize the transfer.

## Steps
1. **Developer initiates request:** The Appliance calls `POST /ask2move` on behalf of a user, specifying the Genome and destination.
2. **Genome enters Settlement Vault:** Onli One moves the Genome from the Owner’s Issued Vault into the Settlement Vault, where it is locked pending approval.
3. **Policy evaluation:** Settlement policies (e.g., KYC, escrow conditions) are evaluated. The Owner reviews and authorizes.
4. **Await Move:** Once conditions are met, a subsequent `POST /move` finalizes the transfer.

`Ask2Move` does not transfer ownership by itself; it is the staging step prior to `Move`.
