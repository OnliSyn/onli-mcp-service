# Conceptual Overview (Canonical)

**What is Onli?**  
Onli treats digital data as unique objects called **Genomes** that live inside a secure **Vault**. Each Genome is bound to an unforgeable **Gene** (the owner’s cryptographic identifier). When you transfer a Genome, the actual object moves from one Vault to another by **destroy & re-create**; **no copies** remain. This makes **possession = ownership** without a public ledger.

**What can you do with it?**  
Issue **academic credentials**, **professional licences**, **KYC/AML proofs**, **contract documents**, **title deeds**, **bonds** and other **financial instruments**. Developers build **Appliances** to mint, transfer and verify Genomes.

**How is Onli different from blockchain?**  
Blockchains record ownership changes on a **public ledger** and transfer information. **Onli transfers the object itself** between private Vaults, has **no miners/gas/tokens**, and uses **receipts** (movement metadata) instead of a ledger.

**Owner / Developer / Issuer quick starts**  
- **Owner**: create **Gene**, set up **Vault**, receive Genomes, manage with **Appliances**.  
- **Developer**: call **Issue → Ask2Move → Move → ChangeOwner**; enforce policy; retrieve receipts.  
- **Issuer**: define **denomination/series**, mint to recipients’ Vaults, attach policies (e.g., **Settlement Vault/locker**), publish verification rules.

**Vault types**: Treasury • Inventory • Issued • Settlement • Blacklisted.
