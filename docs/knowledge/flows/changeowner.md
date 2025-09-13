# ChangeOwner Flow

`ChangeOwner` allows an administrative reassignment of a Genome’s ownership, typically used in issuer-controlled contexts (e.g., key recovery, corporate reorganization). It is not a standard end-user transfer.

## When to use
- Recovery scenarios where the original Owner’s Gene has been lost or compromised.
- Administrative actions by Issuers or regulators within defined policy rules.

## Steps
1. **Authorization:** The Issuer or authorized party validates the reason and obtains necessary approvals.
2. **Call changeowner:** The backend calls `POST /changeowner` with the Genome and new Gene identity.
3. **Reassignment:** Onli One rebinds the Genome to the new Gene and records a receipt.
4. **Notification:** Both old and new owners (and auditors, if applicable) receive proof of reassignment.

Use `ChangeOwner` sparingly and ensure policy compliance; it bypasses the normal owner-controlled transfer flow.
