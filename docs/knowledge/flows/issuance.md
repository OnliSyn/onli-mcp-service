# Issuance Flow

Issuance is the first movement of a newly minted Genome from the Treasury Vault into an Owner's Vault. It is the creation event that brings a Genome into circulation.

## Steps
1. **Define series & denomination:** The Issuer defines the Genome’s denomination and series.
2. **Mint into Treasury:** Genomes are minted in large blocks into the Treasury Vault (reserve).
3. **Issue to Owner:** Using `POST /issue`, the Issuer (via a Developer’s Appliance) moves a Genome from the Treasury into the recipient’s Vault for the first time. This destroys the mint in Treasury and creates the Genome in the Owner’s Vault.
4. **Receipt:** Onli One records a receipt of this Issuance for audit; Vault contents remain private.

Issuance is distinct from transfer because it originates from the Treasury and not from another user.
