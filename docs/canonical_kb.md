# ONLI — Comprehensive Knowledge Base & Knowledge Graph (Canonical)

> Single source of truth for Onli concepts, entities, APIs, and use cases.

## 0. Introduction

Onli is a hyper‑dimensional vector storage system for digital ownership. Instead of ledger entries, Onli transfers possession of indivisible digital objects called **Genomes** between owners【245366387294044†L63-L67】. Each Genome is bound to a unique **Gene** stored in a secure **Vault**, and assets move via **Onli Cloud** on the **Onli One** network【245366387294044†L63-L67】. This ensures singularity and prevents duplication【245366387294044†L86-L89】.

## 1. Core Concepts & Canon

### Ownership Canon

- **Use** – exercise the functions of a Genome【245366387294044†L73-L78】.  
- **Exclude** – only the Gene holder can interact with it【245366387294044†L73-L78】.  
- **Transfer** – atomic, irreversible hand‑off of possession【245366387294044†L73-L78】.  
- **Destroy** – permanent, verifiable deletion【245366387294044†L73-L78】.  

### Triad of Trust

- **Genomes** – indivisible, non‑fungible containers【245366387294044†L81-L83】.  
- **Genes** – unforgeable credentials binding owners to authorization【245366387294044†L81-L84】.  
- **Vaults** – TEE‑backed containers ensuring possession【245366387294044†L81-L85】.  

### Uniqueness Quantification

Deterministic algorithms evolve a Genome’s state at each transfer, maintaining singularity and preventing duplication, spoofing, or cloning【245366387294044†L86-L89】.

### Paradigm Shift

- Files → **Genomes**【245366387294044†L92-L95】  
- Access → **Ownership**【245366387294044†L92-L95】  
- Security → **Control**【245366387294044†L92-L95】  

## 2. Ecosystem & Roles

- **Onli One** – permissioned peer‑to‑peer overlay network【245366387294044†L101-L102】.  
- **Onli Cloud** – orchestration and API layer hosting the **Oracle** and **Transfer Agent**【245366387294044†L102-L104】.  
- **Onli You** – owner application for Vault access and identity management【245366387294044†L103-L104】.  
- **Appliances** – developer‑built applications orchestrating flows【245366387294044†L104-L105】.  
- **Owners**, **Issuers**, **Transfer Agent**, **Treasury Vault**, **Settlement Locker**【245366387294044†L105-L109】.

## 3. Entities & Data Models

All schemas follow v2/v3 naming conventions: keys are `snake_case`, enums are `UPPER_SNAKE`, and identifiers carry prefixes (`usr-`, `gnm-`, `gne-`, `vlt-`, `rcp-`).  These shapes match the MCP service and support documentation.

### 3.1 Owner & Onli ID

```json
{
  "identity": {
    "onli_id": "usr-abc123",
    "first_name": "Alice",
    "last_name": "Nguyen",
    "email": "alice@example.com",
    "phone": "+1-555-0100",
    "status": "STATUS_ACTIVE"
  },
  "context": {
    "appliances": {
      "ENGMA": {
        "user_class": "T1",
        "status": "STATUS_APP_ACTIVE",
        "external_id": "crm-42",
        "extra": "{\"group\":\"enterprise\"}"
      }
    }
  }
}
```

### 3.2 Genome

```json
{
  "genome_id": "gnm-7h2k1",
  "fingerprint": "b3:9f…",
  "type": "ASSET|CREDENTIAL|EMBEDDING",
  "payload_ref": "opaque-blob-ref",
  "metadata": {
    "name": "Invoice #1287",
    "tags": ["finance","2025-Q3"],
    "created_at": "2025-08-01T12:03:04Z"
  },
  "policy": {
    "transferable": true,
    "destroyable": true,
    "capabilities": ["redeem","prove"]
  }
}
```

### 3.3 Gene (Credential)

```json
{
  "gene_id": "gne-3xp9t",
  "public_key": "ed25519:…",
  "holder": "usr-abc123",
  "scopes": ["authenticate","authorize","delegate"],
  "created_at": "2025-07-20T10:10:10Z",
  "expires_at": null
}
```

### 3.4 Vault

```json
{
  "vault_id": "vlt-x2a91",
  "kind": "OWNER_VAULT",
  "owner": "usr-abc123",
  "gene": "gne-3xp9t",
  "attestation": {
    "tee_family": "AMD_SEV_SNP",
    "quote": "…",
    "verified_at": "2025-09-01T15:22:31Z"
  }
}
```

### 3.5 Appliance

```json
{
  "app_symbol": "ENGMA",
  "app_key": "appk_live_…",
  "name": "Engma Markets",
  "callbacks": {
    "auth_webhook": "https://engma.example.com/onli/auth",
    "events": "https://engma.example.com/onli/events"
  }
}
```

### 3.6 Oracle & Receipts

```json
{
  "receipt_id": "rcp-7f3m9",
  "kind": "ISSUE|ASK_TO_MOVE|CHANGE_OWNER|CHANGE_OWNERS|DESTROY",
  "subject": "gnm-7h2k1",
  "from": "usr-seller",
  "to": "usr-buyer",
  "timestamp": "2025-09-03T03:00:00Z",
  "proof": "sig:ed25519:…"
}
```

### 3.7 Movement Objects

**AskToMove**

```json
{
  "ask_to_move_id": "ask-91h8q",
  "to": "usr-buyer",
  "note": {"behavior": "sell", "body": "confirm sell of 1 unit"},
  "amount": 1000000,
  "asset_balance": 2500000,
  "status": "STATUS_OPEN",
  "expires_at": "2025-09-04T03:00:00Z"
}
```

**ChangeOwner**

```json
{
  "change_order_id": "chg-1m2n3",
  "from": "usr-seller",
  "to": "usr-buyer",
  "ask_to_move_id": "ask-91h8q",
  "amount": 1000000,
  "received_at": "2025-09-03T01:00:00Z",
  "owner_changed_at": "2025-09-03T01:00:02Z",
  "delivered_at": "2025-09-03T01:00:05Z"
}
```

**ChangeOwners (split)**

```json
{
  "change_order_id": "chg-9k0p1",
  "from": "usr-seller",
  "sum_of": [
    { "to": "usr-a", "amount": 250000 },
    { "to": "usr-b", "amount": 750000 }
  ],
  "ask_to_move_id": "ask-77zzq",
  "amount": 1000000
}
```

## 4. API Capabilities

The Onli Cloud exposes five endpoints: **Issue** (deliver new Genomes), **AskToMove** (request a transfer), **ChangeOwner** and **ChangeOwners** (complete single or multi‑recipient transfers), and **Destroy** (retire a Genome).  Field names are snake‑case and enums are upper‑snake【245366387294044†L215-L223】.

## 5. Processes & Movement Flows

- **Issue → Possession:** The appliance calls `Issue`; the Treasury Vault supplies Genomes; they are delivered to the Owner Vault; the Oracle logs an issuance receipt【245366387294044†L226-L234】.  
- **AskToMove → Settlement → ChangeOwner:** The appliance submits an `AskToMove`; the Owner authorizes via Onli ID; assets enter the Settlement Locker; the Transfer Agent executes a `ChangeOwner`; the Oracle records receipts【245366387294044†L235-L243】.  
- **ChangeOwners (Split):** Multiple Genomes can be delivered to multiple recipients; conservation is guaranteed【245366387294044†L244-L247】.  
- **Destroy:** The Owner requests destruction; the Vault deletes the Genome; the Oracle records the event【245366387294044†L249-L253】.

## 6. Knowledge Graph & Build Configurations

The concept graph links Owners, Genes, Genomes, Vaults, the Transfer Agent, and the Oracle.  Build configurations include **Denomination**, **Symmetric**, **Series**, and **Compliance Hooks**【245366387294044†L40-L46】.

## 7. Use Cases

Onli enables many applications:

- **Legal & Contracts:** NDAs, deeds, corporate resolutions stored as Genomes【180278417055765†L90-L98】.  
- **Finance & Commerce:** Bonds, invoices, receipts, and supply chain provenance【180278417055765†L102-L111】.  
- **Art & Collectibles:** Certificates of authenticity, one‑of‑one digital works, experiential tokens【180278417055765†L115-L124】.  
- **Healthcare & Personal Records:** Patients own and control their medical records【180278417055765†L126-L129】.  
- **Other Domains:** Credentials, government IDs, enterprise workflows, consumer archives.

## 8. Blockchain Comparison

Blockchains record ledger entries controlled by private keys; Onli transfers possession of the digital object itself and allows deletion.

## 9. Acceptable Use

Onli Corporation does not issue assets or build end‑user applications.  Prohibited uses include illegal goods, hate/violence promotion, fraud, and other restricted activities.  Issuers and developers must comply with applicable laws and regulations.

## Appendix – Traceability Matrix

| Section | Source | Notes |
|---|---|---|
| Introduction | Condensed KB【245366387294044†L63-L67】 | Defines Onli as hyper‑dimensional storage and possession vs ledger. |
| Core Concepts | Condensed KB【245366387294044†L73-L95】 | Ownership canon, Triad, Uniqueness Quantification, Paradigm Shift. |
| Roles | Condensed KB【245366387294044†L101-L109】 | Lists Onli One, Cloud, You, Appliances, Owners, Issuers, Treasury, Settlement, Transfer Agent. |
| Entities & Data Models | Condensed KB【245366387294044†L120-L149】【245366387294044†L153-L173】【245366387294044†L194-L211】 | JSON shapes for Owner, Genome, Gene, Vault, Appliance, Receipts, Movement objects. |
| API & Flows | Condensed KB【245366387294044†L215-L253】 | Describe endpoints and processes. |
| Use Cases | Use‑Case KB【180278417055765†L90-L129】 | Examples across domains. |
| Configurations | Condensed KB【245366387294044†L40-L46】 | Denomination, Symmetric, Series, Compliance Hooks. |
