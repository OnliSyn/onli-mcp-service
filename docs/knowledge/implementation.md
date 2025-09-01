            # Implementation

This document provides a step‑by‑step guide for deploying Onli in practice and integrating it into enterprise workflows.

## Provision Vaults and Genes
Every Onli deployment starts with secure storage: Vaults and Genes. Vaults are trusted execution environments that hold Genomes and Genes. Create a Vault for each owner or service account. During onboarding, each user or application receives a Gene (Onli ID) bound to their Vault’s hardware and biometric factors. Genes manage identity and enforce capability‑based security.

## Define asset types and build configurations
Identify the kinds of digital objects you plan to store (credentials, contracts, invoices, certificates, etc.). For each, choose a build configuration:
- **Denomination** for microcurrencies or balances where totals are expressed via `amount`.
- **Symmetric** for real‑world assets or receipts where every unit is a 1:1 asset.
- **Series** for microcommodities with classes or tranches.
Define asset metadata (class, face, series) and enforce business rules in your appliance.

## Mint Genomes and ingest data
Use the Vault SDK or Onli Cloud API to mint Genomes from your source data. Each minted Genome is uniquely identified and stored in your Vault. For AI and search use cases, embed a vector representation of the data and store it alongside the original content. You can define custom asset schemas and attach metadata that your appliance will use for indexing and retrieval.

## Implement transfer flows
Onli transfers are implemented with the `AskToMove → Locker → (Locker Condition) → ChangeOwner / ChangeOwners` flow.
- **AskToMove:** the current owner authorizes the movement of an asset.
- **Locker:** the asset moves into an escrow vault until conditions are met or, for simple owner‑to‑owner transfers, immediately releases.
- **Condition:** apply a condition such as payment confirmation or regulator approval. For direct transfers or self‑vault moves, this is null.
- **ChangeOwner(s):** finalize the transfer to the new owner(s).
Your appliance should orchestrate these calls to the Onli Cloud API and enforce additional business logic (
pricing, matching, KYC).

## Register receipts and Oracle events
Every transfer or mutation produces a receipt that can be pushed to Onli Cloud. Receipts contain minimal metadata and cryptographic hashes; they do not expose asset contents. Use the Oracle service to register external proofs such as payment confirmation, KYC outcomes, or other conditions required by your workflow. These records enable audits and regulatory compliance.

## Integrate with existing systems
Onli can coexist with traditional databases, data lakes and vector stores. Build connectors or middleware to:
- Synchronize reference data and metadata between Onli and your other systems.
- Use vector embeddings from Genomes in machine learning pipelines and semantic search.
- Provide user interfaces (via Onli You or custom apps) that surface Genomes to end users while enforcing Onli’s access control.

## Monitor, secure and scale
Design policies for credential recovery, key rotation and dual custody for high‑value assets. Monitor Vault health and Vault transactions. As your deployment grows, scale horizontally by running multiple Vault instances and distributing workloads across Onli Cloud. Because Onli is private by default, ensure you have procedures for authorized inspections and disaster recovery.

## Continuous improvement
Update your appliances and asset definitions as business requirements evolve. Stay informed about new Onli features and build configurations. Periodically review your use cases to ensure Onli continues to provide value and meets regulatory and organizational needs.

## Building an Onli Appliance

An Onli Appliance is a client or server application that connects to OnliOne to create, store and transfer Assets on behalf of Owners. Appliances never store or process the contents of a Genome; instead, they manage references and metadata, call Onli Cloud APIs to perform secure transfers, and enforce business rules. To build an Appliance:

1. **Define your Asset class and configuration.** Decide whether your Asset is a micro‑currency (`Denomination`), a 1:1 receipt or record (`Symmetric`), or a series‑based micro‑commodity (`Series`). Use this to inform your application logic and data model.
2. **Provision Vaults and Genes.** Ensure each participant has a Vault (via OnliYou or the Vault SDK) and associated Gene credentials. Appliances should never handle Gene material; they only direct owners to authorize operations.
3. **Mint Assets via Onli Cloud.** Use the Onli Cloud API (`POST /issue`) or the Vault SDK to create new Genomes in the issuer’s Treasury. Attach any required metadata and embedding vectors for AI or search use cases. Only the issuer can mint new Assets.
4. **Implement AskToMove and transfer flows.** For every move, call `POST /askToMove` to request owner authorization, wait for the Locker condition to be satisfied (null for direct transfers), then call `POST /changeOwner` or `POST /changeOwners` to complete the transfer. Appliances handle settlement logic (e.g. verifying payment, KYC, or time locks) and define Locker conditions.
5. **Interact with owners through the OnliYou app or your own UI.** Present owners with clear prompts to authorize transfers via AskToMove and monitor the status of their Vaults. Use Onli Cloud webhooks or polling to update your UI when transfers complete.
6. **Record receipts and audit events.** After each transfer, Onli Cloud emits a receipt and Oracle entry. Store these in your application database for provenance and reconciliation; never expose the underlying Genome content.
7. **Follow security best practices.** Do not store, copy, or transmit Genome contents. Use Genes to authenticate owners and enforce permissions. Ensure your application backend runs in secure environments and that only authorized services can call Onli Cloud.
