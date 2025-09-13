# Genome Lifecycle

1. **Create (Issuance)** — Issuer mints branded, unitary Genomes (optionally configured in one-billion unit blocks at Treasury). The first movement from **Treasury** into an **Owner Vault** is an **Issuance** (`Issue`).  
2. **Own** — Each Genome is bound to an Owner’s **Gene**; only the **Owner** can move, change, or destroy it.  
3. **Transfer** — **Never copy**. Transfer **destroys** the sender’s Genome and **creates** a new one in the recipient’s Vault. Developer Appliances **request** movement with `Ask2Move` into the **Settlement Vault** (policy gate) and finalize with `Move`.  
4. **Proof** — Ownership composition creates a new object bound to the receiver’s **Gene**. Proof is **private by default**; Owners may publish/share via an **Oracle**. Receipts provide auditability without exposing Vault contents.
