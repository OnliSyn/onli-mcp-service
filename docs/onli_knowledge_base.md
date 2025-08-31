# Onli Knowledge Base: Use Cases across Contexts

## Introduction

Onli introduces a new paradigm for digital asset ownership. Instead of storing copies in centralized databases or recording transactions on a public ledger, Onli treats digital data as *unique objects* that can be possessed, transferred and destroyed just like physical items. Each digital asset is embodied as a **Genome** — an immutable and unique data capsule that evolves as it moves from one owner to another. Ownership of a Genome is bound to a **Gene**, an unforgeable cryptographic identifier tied to the owner’s device or identity. Genomes live in **Vaults**, secure execution environments under the owner’s control, and applications built on Onli are called **Appliances**. Together, these components ensure that “**possession = ownership**” — you actually hold the asset itself, not just a record of it. This concept stands in contrast to cryptocurrency transactions, which merely transfer information on a public ledger; an Onli transaction is an asset transfer — the digital object moves from one owner’s Vault to another【699595418289346†L150-L163】.

Because Onli solves the **Uniqueness Quantification Problem** — the challenge of guaranteeing that a digital object cannot be duplicated — it enables new forms of commerce, provenance tracking and data management that are not possible with traditional databases or blockchains【699595418289346†L67-L109】. The purpose of this knowledge base is to map out the practical use cases for Onli across multiple industries and contexts, highlighting how organizations and individuals can leverage Genomes, Genes, Vaults and Appliances to store, transfer and manage valuable data. It also draws on Onli prototypes such as Sutton (microcurrency), Obligs (digital obligations) and GICO Exchange (micro-commodities), described in Onli’s internal presentations and early projects, to illustrate real-world applications.

## Onli Design Principles

### Genomes
A **Genome** is a self-contained digital object that holds both the underlying data (such as a document, image or record) and its state history. Each Genome is cryptographically unique; any modification results in a new version with a different identity. Genomes can store structured metadata and vector embeddings, making them suitable for AI and search. Most importantly, only one authentic copy of a Genome exists at any time — when ownership changes, the previous copy is destroyed or evolved so that there is no possibility of double spending or duplication【876265847775097†L153-L161】.

### Genes
A **Gene** is the unforgeable identity that proves ownership of a Genome. Genes are issued to users or organizations and are bound to their hardware and biometrics. They enforce the right to use, exclude, transfer and destroy Genomes. When a Genome is transferred, the receiving party’s Gene becomes its new owner. This design eliminates lost private keys and stolen accounts, as a Gene cannot be spoofed and is tied to the owner’s secure environment【699595418289346†L150-L163】.

### Vaults
A **Vault** is a secure storage node (device or server) where Genomes reside. Vaults form the storage layer of the Onli network. Unlike cloud services that hold your data on remote servers, Onli Vaults are personal; an owner’s Vault keeps the only copy of their Genomes. There is no backup or master ledger; if you hold the Genome in your Vault, you own it. If you transfer it out, you no longer have access. Vaults can also index vector embeddings for AI search, enabling semantic queries on the data they store.

### Appliances
**Appliances** are the applications that interact with Genomes and Genes. They can mint new Genomes, perform searches, initiate transfers and enforce business logic such as denominations or series. Appliances run on top of the Onli infrastructure and call Onli Cloud services when needed (e.g., to facilitate transfers between Vaults) but do not see the contents of the Genomes; they only handle references and metadata.

### Possession = Ownership
Onli equates possession with ownership: if a Genome is in your Vault, you own it. There is no central record to dispute. This principle is enforced cryptographically and operationally. Every transfer involves moving the actual Genome from the sender’s Vault to the recipient’s Vault; no copies remain behind. This approach solves the double-spend problem for digital assets in a different way than blockchains; instead of a consensus ledger preventing duplicate transactions, Onli prevents duplication by making the asset itself unique and ensuring only one copy exists at any time【699595418289346†L150-L163】.

### Uniqueness vs. Cryptocurrency
Blockchains and cryptocurrencies focus on recording transactions on an immutable ledger. While NFTs claim to create unique tokens, the underlying digital content (image or file) often remains easily copyable, and ownership is essentially a ledger entry. Onli’s Genomes, in contrast, are the digital assets themselves, not records about them. When you transfer a Genome, the data moves; when you destroy it, it is cryptographically erased. There are no miners, gas fees or global consensus. Instead, trust comes from the object’s cryptographic properties and the owner’s Gene【699595418289346†L67-L109】. This makes Onli particularly suitable for sensitive or high-value data where duplication or unauthorized access cannot be tolerated.

## Use Cases Across Different Contexts

Onli’s model enables a diverse range of applications. Below is an extensive, yet non-exhaustive, list of potential use cases grouped by domain.

### 1. Credentials & Verification

* **Academic credentials** — Universities can issue diplomas and transcripts as Genomes stored in the student’s Vault. These credential Genomes are immutable proof of graduation. Employers can verify authenticity by checking the Genome’s provenance rather than contacting the university or trusting a PDF, eliminating fraud.
* **Professional licenses** — Regulatory bodies can issue licenses for doctors, pilots, lawyers, etc., as Genomes. Because each license is unique and bound to the professional’s Gene, it cannot be forged or altered. Renewals and continuing education records can update the same Genome, preserving history.
* **KYC/AML credentials** — Banks and fintechs can perform Know Your Customer (KYC) checks once and then issue a verified identity Genome to the customer. When the customer opens another account or applies for a loan, they present their verified Genome instead of re-submitting documents. The bank verifies the Genome’s signature and the KYC provider’s credential.

### 2. Contracts & Legal Instruments

* **Private contracts** — Non-disclosure agreements, employment contracts and partnership agreements can be minted as Genomes. Both parties hold the Genome, and any amendment evolves the object. The contract can include metadata for signatures, versioning and conditions.
* **Title deeds & property transfers** — Land titles, vehicle ownership or other property deeds can be represented by Genomes. Because possession equals ownership, transferring the deed means transferring the actual Genome. There is no need for a government registry to prove ownership; the provenance is built into the Genome.
* **Corporate resolutions** — Board minutes, shareholder resolutions and corporate governance documents can be stored as Genomes. The Vault ensures they remain tamper-proof. Audit and compliance functions can verify the authenticity and history of these records.

### 3. Finance & Commerce

* **Issuance of financial instruments** — Companies can issue bonds, invoices, credit notes and other financial instruments as Genomes. Each instrument is a unique object that tracks its own lifecycle from issuance to redemption. This reduces paperwork and ensures authenticity.
* **Proof of payment & receipts** — When a merchant receives payment, they issue a receipt as a Genome to the customer. The customer stores it in their Vault. If there is a dispute, the receipt’s provenance proves payment without relying on central databases.
* **Supply chain provenance** — Every stage of a supply chain can issue a Genome representing the state of a shipment or component. Manufacturers, distributors and retailers each hold the Genome and update it as it moves along the chain. Because there is no global ledger, sensitive pricing or trade secrets remain private, but the authenticity and integrity of goods are preserved.

### 4. Luxury, Art & Collectibles

* **Digital certificates of authenticity** — High-value items like art, watches or vintage wines can have a digital certificate minted as a Genome. The certificate moves with the physical item. When the item is sold, the certificate is transferred, ensuring the buyer knows they have the authentic piece.
* **One-of-one digital works** — Artists can mint their digital art as unique Genomes (not blockchain NFTs). Because the Genome itself is the artwork, there is truly only one copy. Collectors can own, gift or trade these works without worrying about duplicates or token speculation.
* **Experiential tokens** — Hospitality or lifestyle brands (e.g., hotels like Nøgen in Onli’s demos) can issue a unique “experience Genome” tied to a guest’s stay. This could include images, personal messages, or embedded media that memorialize the visit. The guest keeps the Genome as a unique digital souvenir, and it can unlock perks or loyalty rewards.

### 5. Healthcare & Personal Records

* **Medical records** — Test results, diagnoses, and electronic health records can be minted as Genomes owned by the patient. The patient decides which doctors can view or hold copies. Sharing is done via transfers or capabilities, ensuring granular control and privacy.
* **Vaccination proofs** — Instead of a QR code or a paper card, vaccinations can be recorded as tamper-proof Genomes. The patient holds the proof and presents it when required. Authorities can verify the Genome’s authenticity without accessing underlying medical data.
* **Clinical trial data** — Pharmaceutical companies and research institutions can issue trial results or participant consent forms as Genomes. This ensures tamper-proof provenance of data and compliance with regulations. Trials can prove that data was not altered and that participants’ identities remain confidential.

### 6. Government & Public Services

* **Digital IDs & passports** — Governments can issue identification documents as Genomes stored in citizens’ Vaults. Unlike blockchain-based identity systems, this approach respects privacy (IDs are not on a public ledger) and supports offline verification. Citizens present their ID Genome when needed.
* **Voting tokens** — In a digital voting system, each ballot can be a unique Genome. When a voter casts their ballot, they transfer the Genome to the election authority. Because each Genome is unique and tied to a Gene, double-voting is impossible and privacy is preserved.
* **Permits & licenses** — Fishing permits, hunting licenses, construction permits and other approvals can be issued as Genomes. Inspectors can verify them instantly by checking the Genome’s signature. Expired permits can evolve or be destroyed automatically.

### 7. Enterprise & Workflows

* **Internal document control** — Sensitive corporate documents (design specifications, research papers, secret memos) can be issued as Genomes. Each version is unique and tamper-proof. Access can be controlled by transferring the Genome or by granting temporary capabilities; unauthorized copies cannot exist.
* **Employee credentials** — HR departments can issue employment verification Genomes, linking an employee’s name, role, start date and other credentials. Third-party background checks can verify employment by checking the Genome’s authenticity.
* **Confidential communications** — Secure internal communications (e.g., board presentations or product plans) can be sent as Genomes. Recipients prove authenticity by verifying the Genome’s chain of custody. The sender knows that only intended recipients can open it.

### 8. Consumer & Everyday Use

* **Personal archives** — Individuals can store important receipts, warranties, personal contracts, and even family photos as Genomes in their Vault. Each item remains private and under their control. There is no risk of cloud service providers mining or losing the data.
* **Proof of origin for digital creations** — Writers, musicians, designers and other creators can wrap their works as Genomes when they publish them. This provides a timestamped proof of origin and ownership. If the work goes viral, the creator can prove authorship.
* **Membership passes and event tickets** — Gyms, clubs, concerts and conferences can issue entry passes as Genomes. Each pass is unique and non-duplicable, preventing counterfeiting or scalping. A member holds the pass in their Vault and presents it at entry.

## Additional Example Use Cases from Onli Demonstrations

The Onli prototypes and early projects provide concrete examples of how these use cases work in practice.

### Microcurrency & Microcommodity: Sutton Example

In the **Sutton microcurrency** presentation, Onli demonstrated how a company could simplify its supply chain by adopting a single digital currency for internal transactions. Instead of juggling multiple fiat currencies and tokens, suppliers and buyers used a stable microcurrency minted as Genomes called **Suttons**. Transactions occurred by transferring these Genomes from one Vault to another, and because the assets were unique and non-fungible, there was no risk of double-spending or counterfeit coins. The presentation highlighted the benefits: **no double spend, no keys to lose and no ledgers to mine**【876265847775097†L153-L161】. Suppliers could request settlement or redemption of Suttons on-demand, and the on-chain complexity of blockchain was avoided. Onli’s microcurrency model can be applied to other internal currencies, such as loyalty points or community credits.

### Digital Obligations & Onli-Paper: Obligs App

The **Obligs** project tackled the problem of counterfeit and impersonated financial instruments. In traditional financial markets, debt obligations (notes, invoices, bonds) can be forged or misrepresented. Onli’s solution minted these obligations as **Onli-Paper** documents (Genomes) and represented ownership as **Obligs coins**. These coins were not cryptocurrencies but tokens within a permissioned Onli marketplace. A lender could buy a note Genome and hold it in their Vault; the debt contract was preserved immutably, and transfer of ownership could not be forged. The Obligs whitepaper noted that blockchains and NFTs record transactions but **cannot represent legal ownership or authenticity of real-world assets**【259533348794211†L25-L38】. Onli provided a way to store the document itself and prove who owned it at any time【259533348794211†L126-L156】. This model can be extended to other digital obligations, such as invoices, royalties or subscription receipts.

### Microcommodity & Exchange: GICO Example

In the **GICO Exchange** prototype, Onli was used to create a micro-commodity trading platform for EB-5 investments. The platform issued GICO certificates as Genomes representing investment units that could be traded on a private exchange. Investors and lenders benefitted from **immediate liquidity, private trading and forward contract features**【952516385344776†L31-L40】. A **forward contract** guaranteed lenders a return tied to future interest payments【952516385344776†L170-L209】. Because each micro-commodity unit was a unique Genome, fractional ownership and redemption could be managed precisely. The GICO example illustrates how Onli can support sophisticated financial structures (beyond simple payments) without exposing sensitive data to public blockchains or central registries.

### Brands & the Uniqueness Quantification Problem

The **Brands** slide deck explained Onli’s fundamental differentiator: it solves the **Uniqueness Quantification Problem**, which is the difficulty of ensuring that a digital thing is the one and only copy【699595418289346†L67-L109】. Unlike blockchain tokens, which point to external files that can be copied endlessly, Genomes are inherently unique and cannot be duplicated【699595418289346†L150-L163】. The deck emphasized that Onli transactions are asset transfers (possession changes) rather than ledger entries, and they occur privately over a peer-to-peer network without public ledgers or keys to lose. This makes Onli suitable for use cases where privacy, authenticity and control are paramount. The Brands overview also noted that there are no gas fees or mining costs; the only fees are for storage and compute when performing a transfer, making the system predictable and cost-effective.

## Conclusion

Onli provides a groundbreaking approach to digital asset management. By combining cryptographic uniqueness with secure identity and actual possession, Onli enables a vast array of applications that benefit from authenticity, provenance and owner control. The use cases outlined here demonstrate how Genomes, Genes, Vaults and Appliances can reshape industries ranging from education and healthcare to finance and government. Unlike blockchains, Onli has no global ledger, no mining and no tokens. Instead, it offers a **private-by-default** network where assets move directly between owners and the proof of transfer is recorded in an **Oracle** only as needed for verification.

Organizations adopting Onli can start with small pilots — perhaps issuing credentials or managing sensitive documents — and expand to more complex scenarios like microcurrency and micro-commodity exchanges. For consumers, Onli means personal data can be truly yours, stored in your Vault and shared only when you decide. For enterprises, Onli offers a way to manage digital assets that is secure, compliant and aligned with real-world ownership. As digital transformation accelerates and the value of data grows, Onli’s model of unique, self-contained digital objects may become a foundation for the next generation of data storage and control.
