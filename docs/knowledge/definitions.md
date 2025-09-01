# Definitions

This document defines the core entities in the Onli ecosystem.

## ONLI™
A technology that ensures the unique quantification of stored and transferred data.

## OnliOne
A private computing network of hyper‑dimensional vector storage systems. It contains Vaults and Owners and enables uniqueness quantification across connected devices.

## Vaults
Self‑contained execution environments functioning as OnliVaults – high‑security databases that store Onli (Genomes coupled with Genes). Each Vault enforces actual possession and is under the direct control of its owner. Vaults Vaults run in trusted execution environments (TEEs) and use hardware isolation to secure and execute computations on assets.
## Assets (Branded Genomes)
An Asset is a branded Onli: a non‑fungible (unique) document tightly coupled to an unforgeable credential (Gene) and a protocol. It can represent micro‑currencies or micro‑commodities. Assets encapsulate value via a hyperdimensional tensor data model and protocol rules for movement, enforced by Genes and the trusted execution environment.

## Genomes
Genomes are hyperdimensional vector storage containers arranged as multi‑dimensional tensors (e.g., three‑dimensional arrays). Coupled with a Gene, they form an OOnli. Instead of duplicating data, operations such as send or copy invoke the uniqueness quantification algorithm, which evolves the Genome's internal state. This ensures there is always one unique instance across all vaults.
## Helices
Hyperdimensional vectors that make up a Genome. Each Genome contains 10 Helices.

## Base Pairs
Fundamental data representations inside a Helix. Each Base Pair stores an attribute–value pair.

## Genes
Genes are unforgeable credentials that represent an owner’s digital identity. They include agents for security, identity, authentication, and authorization, and they are tied to a Vault and its owner. Only the holder of the Gene can access or move the associated assets.


## Uniqueness Quantification & Evolution
Onli ensures uniqueness through a non‑deterministic algorithm that evolves a Genome whenever operations like send or copy occur. Instead of duplicating data, the container’s state is updated, preserving a single global version. These evolutionary transfer mechanisms make Onli resistant to cloning, spoofing, and hacking, while enabling assets to maintain a real‑time global state across connected devices.

Special Genomes that represent an owner’s digital identity. They contain agents for security, identity, authentication and authorization and are tied to a Vault and Owner【887808116772823†L21-L31】.

## Agents
Autonomous programs that compute base pairs. Agents operate within Vaults and OnliOne to enforce policies and implement behaviours.

## Owners
Human users of OnliOne. Each owner possesses a Gene and can own assets (Genomes). Owners authenticate and authorize actions via their Gene.

## Issuers
Special users that mint and issue assets to owners. Issuers own Treasuries.

## Treasuries
Special vaults that store newly minted, unissued assets.

## Mint
A special vault containing the algorithms for generating unowned assets (Genomes).

## Appliances
Applications running on the Onli Cloud OS. Appliances interact with owners and implement business logic (e.g., marketplaces, digital wallets). Developers build Appliances to connect clients (Onli You) to the Onli Cloud.

## ONLI Cloud
A cloud operating system that manages the operation and execution of the OnliOne network. It provides functions‑as‑a‑service (FaaS) for issuance, transfers, settlement and Oracle registration but never stores the asset itself【887808116772823†L88-L100】.
