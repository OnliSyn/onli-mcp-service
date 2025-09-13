# API Design Patterns (v3 Flows)

## Core flows
- `POST /issue` — Mint from Treasury (Issuance).  
- `POST /ask2move` — Request movement into **Settlement Vault** (policy gate).  
- `POST /move` — Finalize movement once Owner/conditions authorize.  
- `POST /changeowner` — Administrative reassignment (issuer context / recovery).

## Streaming & Async
Use `Ask2MoveStream` for large batches; use **webhooks** for settlement confirmation and final receipts.

> **Implementation note:** Keep backends **event-driven**; treat `Ask2Move → Move` as a two-step saga with policy evaluation at Settlement.
