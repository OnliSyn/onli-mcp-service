# Onli — Minimal MCP Service & Knowledge Base

This repository provides a minimal implementation of an **Onli Knowledge Base service** using the Model Context Protocol (MCP). It exposes the knowledge base about Onli for applications by responding to API requests with relevant data.

## What is Onli (canonical, 30-sec read)
Onli turns digital data into unique objects called **Genomes** that live in your **Vault** and are bound to your **Gene**. When a Genome moves, the original is **destroyed** and a new one is **created** in the recipient’s Vault—**no copies, no ledger**. The **Onli One** network moves objects and records **receipts** privately. Developers build **Appliances** that call **Issue → Ask2Move → Move → ChangeOwner**, while **Owners retain exclusive control**.

**Not a blockchain:** no miners, no gas, no tokens, no global ledger; receipts are not a ledger.

### Canon quick links
- `docs/knowledge/10-structured-responses.md`
- `docs/knowledge/conceptual-overview.md`
- `docs/knowledge/genome-lifecycle.md`
- `docs/knowledge/technical-architecture.md`
- `docs/knowledge/api-design-patterns.md`

### Vault taxonomy
Treasury • Inventory • Issued • Settlement • Blacklisted.

### Developer posture
Apps never seize custody. They **request** movement via `Ask2Move` into the **Settlement Vault** (policy gate). When conditions are satisfied (and/or the Owner authorizes), `Move` finalizes the transfer.

---

## MCP Service (overview)
This service demonstrates how to package a domain-specific knowledge base and expose it via a standardized protocol. It serves as a foundational component for systems that need factual information about the Onli ecosystem.

**Key principles**: unitary Genomes; possession = ownership; privacy by default; receipts only; event-driven flows.

See `mcp-kb/` and `src/` for the minimal server code.
