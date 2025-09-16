# Onli Knowledge Base – MCP Server (Updated Technical Specs)

This knowledge base provides a consistent and accurate description of each RPC/REST method available in the Onli ecosystem.  For each endpoint, the purpose, official resources (Buf.Build protocol buffers and Postman collection), example request/response pairs and implementation notes are documented.  When applicable, further notes describe important status values, time‑outs, prerequisites and follow‑up actions.

## Onli Cloud API

### Issue – Mint assets from Treasury to an Owner

| Field | Description |
|---|---|
| **What it does** | Mint (issue) new Genomes from the Treasury Vault to an Owner’s Vault.  The caller specifies the recipient (`to`), the application symbol (`app_symbol`), the total face value (`amount`), and the destination device (`which_device`: `cloud`/`desktop`/`mobile`).  Genomes can be issued by amount or by specifying pre‑minted `onli_ids`【870736586076395†screenshot】. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud) – protocol buffer definitions for Onli Cloud RPC. |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843) – interactive requests for Onli Cloud endpoints. |

#### Example request
```json
{
  "to": "usr-abc123",
  "app_symbol": "ENGMA",
  "amount": 10,
  "which_device": "cloud"
}
```

#### Example response
```json
{
  "issue_id": "iss-0c6af7",
  "issued_at": "2025-09-03T03:00:00Z",
  "owner_changed_at": "2025-09-03T03:00:00Z",
  "delivered_at": "2025-09-03T03:00:00Z",
  "pkg_tag": "pkg-33b8"
}
```

#### Extra notes
- The `IssueInput` message also supports an optional `onli_ids` array for issuing specific Genome IDs; when provided the `amount` parameter is ignored【575778553593422†screenshot】.
- The caller must pay a one‑time issuance fee of $0.05 per asset; the fee is credited to the developer account【870736586076395†screenshot】.
- Issuances may be classified as **amount‑based** (creating new Genomes) or **ID‑based** (assigning pre‑minted Genomes) depending on the `genus` category【575778553593422†screenshot】.

---

### AskToMove – Request owner authorization to move assets

| Field | Description |
|---|---|
| **What it does** | Initiates a stream that asks an Owner to move a specified amount of Genomes from their Vault into a **Settlement Locker**.  The request body includes the recipient (`to`), face value (`amount`), app symbol (`app_symbol`), settlement duration in hours (`add_settle_time`), and a **note** containing `behavior` and `body` strings.  The owner is notified via Onli You and must accept or deny the request【213832094324533†screenshot】. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud). |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843). |

#### Example request
```json
{
  "add_settle_time": 2,
  "amount": 5,
  "app_symbol": "ENGMA",
  "note": {
    "behavior": "Transfer",
    "body": "Settlement for invoice #123"
  },
  "to": "usr-xyz789"
}
```

#### Example response
```json
{
  "ask_to_move_id": "ask-91h8q",
  "pkg_tag": "pkg-0bd3",
  "to": "usr-xyz789",
  "note": {
    "behavior": "Transfer",
    "body": "Settlement for invoice #123"
  },
  "amount": 5,
  "app_symbol": "ENGMA",
  "asset_balance": 5,
  "notified_at": "2025-09-03T03:00:00Z",
  "status": "OPEN",
  "expires_at": "2025-09-03T05:00:00Z",
  "behavior_status": "ASKED",
  "authorization_status": "ASKED",
  "auth_log_id": "auth-2f7bc"
}
```

#### Extra notes
- **Request status values**: `ASKED` (awaiting owner), `DENIED`, `OPEN` (approved and locker open), `ASKED_EXPIRED`, `OPEN_EXPIRED`, `CLOSED`, `HOLD`, `RETURNED`, `FAILED`【545100419203769†screenshot】.  The field `expires_at` corresponds to `add_settle_time` hours after creation【579495501361477†screenshot】.
- **Stream workflow**: 1. Appliance sends `AskToMoveReq` → 2. Owner receives notification → 3. Owner accepts/denies via Onli You → 4. `AskToMoveRecord` returns the status and metadata → 5. If accepted the assets move to Settlement Locker (locked) → 6. If assets are unused when `expires_at` passes, they return to the owner【579495501361477†screenshot】.
- **Settlement Locker behavior**: Assets in the Locker can only be used in a subsequent `ChangeOwner` call.  If no ChangeOwner occurs before expiry, assets automatically return to the owner【577889575680366†screenshot】.
- Appliances should monitor the `ask_to_move_id` and call `GetAskToMoveRecord` or `ChangeOwner` once the owner accepts【577889575680366†screenshot】.

---

### ChangeOwner – Transfer ownership of Genomes (requires AskToMove)

| Field | Description |
|---|---|
| **What it does** | Completes a transfer authorized via an **AskToMove** request.  Moves Genomes from the Settlement Locker to the recipient’s Vault and performs any necessary genome‑evolution (editing).  Requires the previous owner (`from`), new owner (`to`), the `ask_to_move_id` from the open AskToMove request, the app symbol, amount, and destination device (`which_device`)【727112441892813†screenshot】. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud). |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843). |

#### Example request
```json
{
  "from": "usr-abc123",
  "to": "usr-xyz789",
  "ask_to_move_id": "ask-91h8q",
  "app_symbol": "ENGMA",
  "amount": 5,
  "which_device": "cloud"
}
```

#### Example response
```json
{
  "ask_to_move_id": "ask-91h8q",
  "evolve_id": "evo-7d2c5",
  "received_at": "2025-09-03T03:05:00Z",
  "owner_evolved_at": "2025-09-03T03:05:01Z",
  "delivered_at": "2025-09-03T03:05:02Z"
}
```

#### Extra notes
- **Prerequisite**: the associated `AskToMove` record must be in the `OPEN` state and the `amount` and `app_symbol` must match the AskToMove request【727112441892813†screenshot】.
- **Process flow**: (1) Validate prerequisites (open AskToMove, same app symbol and amount); (2) Access Genomes in the Settlement Locker; (3) Evolve genomes (gene editing if necessary); (4) Transfer ownership to new owner; (5) Deliver genomes to destination device; (6) Return completion details【213303038435885†screenshot】.
- **Split delivery**: For multi‑recipient transfers, use the `ChangeOwners` variant (not fully documented but supported by Onli Cloud API).  The process locks assets once and splits them among recipients.

---

### AuthenticateOwner – Authenticate an Owner via Onli ID

| Field | Description |
|---|---|
| **What it does** | Bi‑directional stream used to authenticate an Owner for Onli One.  The appliance sends an `AuthenticateOwnerReq` containing the `owner` ID, `app_symbol` and a human‑readable `body`; the server responds with an `AuthenticateOwnerRecord` containing the `authentication_status` and the owner’s cloud vault asset balance【46633015438569†screenshot】.  Optional `rev_string` may be provided for **reverse‑MFA** (gene + master string) or future reverse‑hash methods【46633015438569†screenshot】. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud). |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843). |

#### Example request (basic auth)
```json
{
  "owner": "usr-abc123",
  "app_symbol": "ENGMA",
  "body": "Please authenticate to view your assets"
}
```

#### Example response (basic auth)
```json
{
  "owner": "usr-abc123",
  "auth_log_id": "auth-7d8ef",
  "authentication_status": "AuthenticationStatusACCEPTED",
  "auth_type": "BASIC",
  "asset_balance": 14
}
```

#### Example request (reverse MFA)
```json
{
  "owner": "usr-abc123",
  "app_symbol": "ENGMA",
  "body": "Reverse MFA example",
  "rev_string": "123456"
}
```

#### Example response (reverse MFA)
```json
{
  "owner": "usr-abc123",
  "auth_log_id": "auth-8c9fa",
  "authentication_status": "AuthenticationStatusACCEPTED",
  "auth_type": "REVERSE_MFA",
  "rev_string": "123456",
  "asset_balance": 14
}
```

#### Extra notes
- **Authentication methods**: `BASIC` (gene only), `REVERSE_MFA` (gene + master string), `REVERSE_HASH` (future).  The server determines the method based on presence of `rev_string`【46633015438569†screenshot】.
- **Status values**: `ASKED`, `ACCEPTED`, `DENIED`, `EXPIRED`【753296078842208†screenshot】.
- Use the returned `auth_log_id` to audit the authentication via the `AuthLog` endpoint.

---

### AuthorizeBehavior – Authorize specific owner behavior

| Field | Description |
|---|---|
| **What it does** | Allows an appliance developer (master user) to request authorization from an Owner to perform a specific behavior (e.g., login, view).  The `AuthorizeBehaviorReq` includes the `owner` ID, `app_symbol`, a `note` describing the behavior, the `behavior` string and a `body` message【831303745877724†screenshot】.  The Owner responds via Onli You; the returned `AuthorizeBehaviorRecord` provides status and timestamp. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud). |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843). |

#### Example request
```json
{
  "owner": "usr-abc123",
  "app_symbol": "ENGMA",
  "note": {
    "behavior": "login"
  },
  "behavior": "login",
  "body": "Authorize login from new device"
}
```

#### Example response
```json
{
  "owner": "usr-abc123",
  "auth_log_id": "auth-5d6f8",
  "authentication_status": "ACCEPTED",
  "app_symbol": "ENGMA",
  "note": {
    "behavior": "login"
  },
  "behavior": "login",
  "body": "Authorize login from new device"
}
```

#### Extra notes
- **Default behaviors**: `move` (authorize moving Genomes), `BEHAVIOR` (custom behaviors such as login or 2FA)【199197874605101†screenshot】.
- **Authorization status values**: `ASKED`, `ACCEPTED`, `DENIED`, `EXPIRED`【199197874605101†screenshot】.
- After authorization, use the returned `auth_log_id` with `AuthLog` for audit logs.

---

### AuthLog – Retrieve authentication/authorization records

| Field | Description |
|---|---|
| **What it does** | Returns an immutable record of a prior authentication or authorization event.  Callers provide the `auth_log_id` and `app_symbol`, and the service returns detailed information including timestamps, security method used, appliance, geo data, request/response payloads and error messages【277536536620421†screenshot】. |
| **Buf.Build** | [onli‑cloud](https://buf.build/onlicorp/onli-cloud). |
| **Postman** | [Onli Cloud API collection](https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843). |

#### Example request
```json
{
  "app_symbol": "ENGMA",
  "auth_log_id": "auth-5d6f8"
}
```

#### Example response (simplified)
```json
{
  "AuthLogId": "auth-5d6f8",
  "TS": "2025-09-03T03:05:00Z",
  "WhichSecurityMethod": "authorize_behavior",
  "WhichAppliance": "ENGMA",
  "GeoData": {
    "ip": "198.51.100.42",
    "country": "US"
  },
  "Request": {
    "owner": "usr-abc123",
    "behavior": "login"
  },
  "Response": {
    "authentication_status": "ACCEPTED"
  },
  "Err": null
}
```

#### Extra notes
- `AuthLog` entries form an **immutable chain** of records for every security event such as `ask_to_move_stream`, `authenticate_owner`, `authorize_behavior`, `issue` and `change_owner`【112648869039441†screenshot】.
- Use cases include auditing, debugging, analytics, compliance and troubleshooting【112648869039441†screenshot】.

---

## Onli ID (Owners) API

### CreateOwner – Provision a new Owner

| Field | Description |
|---|---|
| **What it does** | Creates a new **Owner** object tied to a pre‑minted `onli_you_id`.  When called, the service invites the new Owner via email and SMS and assigns the user to the specified appliance.  The request includes `identity` fields (onli_you_id, email, phone), `context.appliances` containing the application’s config (user class, behaviors) and optional `user_class` for classification【561028255103071†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id) – protocol definitions for Onli ID RPC. |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "data": {
    "identity": {
      "onli_you_id": "usr-319d53bc-cf9b-5cea-9ec7-e6863a35b450",
      "email": "new.owner@example.com",
      "phone": "+1-555-0100"
    },
    "context": {
      "appliances": {
        "ENGMA": {
          "user_class": "T1",
          "user_behaviors": ["move", "login"]
        }
      }
    }
  }
}
```

#### Example response
```json
{
  "identity": {
    "onli_you_id": "usr-319d53bc-cf9b-5cea-9ec7-e6863a35b450"
  }
}
```

#### Extra notes
- Requires `user_id` (master ID) and `app_key` (appliance key) obtained during developer registration【304969497117561†screenshot】.
- The `user_behaviors` list defines which behaviors the Owner is allowed to authorize (e.g., `move`, `login`).  The caller cannot modify identity data after creation【185190462999493†screenshot】.

---

### GetOwner – Retrieve an Owner’s full profile

| Field | Description |
|---|---|
| **What it does** | Returns a complete **Owner** object and associated appliance data.  The request requires the `app_symbol` and `onli_you_id`.  The response includes identity fields (name, email, address, phone, status), context, and `appliances.{app_symbol}` containing the owner’s status, class, and custom `extra` JSON【386655914700478†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id). |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "app_symbol": "ENGMA",
  "onli_you_id": "usr-abc123"
}
```

#### Example response (truncated)
```json
{
  "identity": {
    "onli_you_id": "usr-abc123",
    "first_name": "Alice",
    "alt_name": null,
    "last_name": "Nguyen",
    "email": "alice@example.com",
    "alt_email": null,
    "username": "alice.nguyen",
    "address_line1": "123 Main St",
    "city": "Phoenix",
    "state": "AZ",
    "postal": "85001",
    "country": "US",
    "phone": "+1-555-0100",
    "company": "Example Co.",
    "status": "STATUS_ACTIVE"
  },
  "context": {
    "appliances": {
      "ENGMA": {
        "user_class": "T1",
        "status": "STATUS_APP_ACTIVE",
        "extra": "{\"group\":\"enterprise\"}"
      }
    }
  }
}
```

#### Extra notes
- Use `GetOwner` to verify updates after `CreateOwner` or `UpdateOwner`【170243015355788†screenshot】.
- For a lightweight lookup of a single attribute, use `FetchOwner` instead.

---

### FetchOwner – Fetch a single attribute of an Owner

| Field | Description |
|---|---|
| **What it does** | Lightweight method that returns one attribute from an Owner object.  Specify `condition` (e.g., `identity.username`, `identity.email`, `context.appliances.ENGMA.status`) along with `app_symbol` and `onli_you_id`.  The service returns only the requested data【60182787606528†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id). |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "app_symbol": "ENGMA",
  "onli_you_id": "usr-abc123",
  "condition": "identity.username"
}
```

#### Example response
```json
{
  "data": "alice.nguyen"
}
```

#### Extra notes
- Common conditions include `identity.username`, `identity.email`, `identity.status`, `context.appliances.{app_symbol}.user_class`, `.status`, `.extra`【468911895833135†screenshot】.
- Ideal for caching and UI rendering; for full profiles use `GetOwner`【468911895833135†screenshot】.

---

### ListOwner – List owners associated with an appliance

| Field | Description |
|---|---|
| **What it does** | Returns an array of Owner objects for a given `app_symbol`.  Supports optional `condition` to limit returned fields and `meta` for pagination (e.g., `meta.limit`).  Each Owner entry contains minimal identity and appliance data or the full profile depending on the condition【795456193825507†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id). |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "app_symbol": "ENGMA",
  "condition": "full",
  "meta": {
    "limit": 10
  }
}
```

#### Example response (simplified)
```json
{
  "data": [
    {
      "identity": {
        "onli_you_id": "usr-abc123",
        "first_name": "Alice",
        "last_name": "Nguyen"
      },
      "context": {
        "appliances": {
          "ENGMA": {
            "user_class": "T1",
            "status": "STATUS_APP_ACTIVE"
          }
        }
      }
    },
    {
      "identity": {
        "onli_you_id": "usr-def456",
        "first_name": "Bob",
        "last_name": "Johnson"
      },
      "context": {
        "appliances": {
          "ENGMA": {
            "user_class": "T1",
            "status": "STATUS_APP_INACTIVE"
          }
        }
      }
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0,
    "count": 2
  }
}
```

#### Extra notes
- The `condition` parameter works like `FetchOwner`: e.g., `identity.email` returns only the email addresses【795456193825507†screenshot】.
- `meta.limit` and `meta.offset` support pagination.  Unspecified fields default to 100 limit and offset 0【811347924791216†screenshot】.
- Filtering may be performed client‑side after retrieving results.

---

### UpdateOwner – Update appliance‑scoped attributes of an Owner

| Field | Description |
|---|---|
| **What it does** | Updates an Owner’s appliance data.  Pass the `onli_you_id` under `identity`, and within `context.appliances.{app_symbol}` specify fields to change: `user_class`, `status`, and/or `extra` (escaped JSON).  Unspecified attributes remain unchanged【236791667172477†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id). |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "data": {
    "identity": {
      "onli_you_id": "usr-319d53bc-cf9b-5cea-9ec7-e6863a35b450"
    },
    "context": {
      "appliances": {
        "ENGMA": {
          "user_class": "new_class",
          "extra": "{\"foo\":\"bar\"}"
        }
      }
    }
  }
}
```

#### Example response
```json
{
  "identity": {
    "onli_you_id": "usr-319d53bc-cf9b-5cea-9ec7-e6863a35b450"
  }
}
```

#### Extra notes
- Updating only modifies specified attributes; other values remain unchanged【185190462999493†screenshot】.
- If an attribute does not exist, it will be created.  Identity fields (name, email) cannot be updated via this method【185190462999493†screenshot】.
- Use `extra` to store custom key‑value pairs as an escaped JSON string; ensure proper escaping【185190462999493†screenshot】.
- Verify your update with `GetOwner` or `FetchOwner` after the call【185190462999493†screenshot】.

---

### AskToAddOwner – Invite an existing owner to join an appliance

| Field | Description |
|---|---|
| **What it does** | Serves as a notification to an existing Owner requesting membership in an appliance.  The request includes the existing owner’s `onli_you_id`, the inviting application’s `app_symbol`, an `appliance` configuration for the owner (e.g., `user_class`), and optional custom fields.  The owner must accept through Onli You, after which the owner becomes part of the appliance【671702057200284†screenshot】. |
| **Buf.Build** | [onli‑id](https://buf.build/onlicorp/onli-id). |
| **Postman** | [Onli ID API collection](https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855). |

#### Example request
```json
{
  "data": {
    "onli_you_id": "usr-afa3dae3-e37e-525e-927d-f65660dd2d30",
    "app_symbol": "ENGMA",
    "appliance": {
      "user_class": "owner"
    }
  }
}
```

#### Example response
```json
{
  "onli_you_id": "usr-afa3dae3-e37e-525e-927d-f65660dd2d30",
  "ask_to_add_owner_id": "61c81618-1455-41c6-b5b9-6a10d4be5612",
  "app_symbol": "ENGMA"
}
```

#### Extra notes
- **Owner membership scenarios**: new owner creation (handled by `CreateOwner`), non‑existing owner request (via Onli You app), existing owner request (via AskToAddOwner), and app‑developer invitation (also AskToAddOwner)【932338722347767†screenshot】.
- **Notification & queue system**: Developers receive membership requests through the **Appliance Tray Services** message queue; owners are notified via Onli You; track membership requests via the returned `ask_to_add_owner_id`【932338722347767†screenshot】.
- Prerequisites: you must know the existing owner’s `onli_you_id` and have your `app_symbol` configured in the Appliance tray【932338722347767†screenshot】.

---

## Summary of Buf.Build and Postman Collections

- **Onli Cloud API**
  - Buf.Build repository: `https://buf.build/onlicorp/onli-cloud` (protocol definitions for `Issue`, `AskToMove`, `ChangeOwner`, `AuthenticateOwner`, `AuthorizeBehavior`, `AuthLog` and related methods).
  - Postman collection: `https://postman.com/onlicorp/onli/collection/6797acdc69c951396fe48843`.

- **Onli ID (Owners) API**
  - Buf.Build repository: `https://buf.build/onlicorp/onli-id`.
  - Postman collection: `https://postman.com/onlicorp/onli/collection/6797a4d869c95139fe47855`.

These links host the authoritative protocol definitions and interactive examples used throughout this knowledge base.
