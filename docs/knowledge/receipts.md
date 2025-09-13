# Receipts

**Receipts** are immutable records of Genome movements between Vaults. They provide auditability and trust without exposing Vault contents.

- **Contents:** A receipt includes metadata such as sender Gene, recipient Gene, denomination/series, timestamp, and transfer type. It does **not** include the Genome’s data.
- **Purpose:** Receipts enable compliance, reconciliation, and proof-of-transfer without a global ledger.
- **Privacy:** Receipts are stored by the Onli One network. They are private by default; Owners may choose to share receipts via an Oracle for external verification.
- **Difference from ledger:** A receipt is not a blockchain transaction. There is no ordering or consensus; receipts simply record that a destroy & re-create event occurred.

Receipts support auditing and regulatory requirements while preserving user privacy.
