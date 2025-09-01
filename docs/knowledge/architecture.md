### Architecture

#### Triad of Trust
- **Genomes**: Unique hyperdimensional vector storage objects built from 10 Helices and 10 Base Pairs each. Each Genome holds content or data and cryptographic proofs ensuring uniqueness and integrity【887808116772823†L21-L31】.
- **Genes**: Special Genomes representing identity and access control. Genes implement capability-based security and are bound to biometrics or devices. They allow the owner to use, exclude, transfer or destroy Genomes【887808116772823†L21-L31】.
- **Vaults**: Self-contained execution environments (trusted execution environments) that store Genomes (assets) and Genes (owner identities). Vaults run on devices or servers using hardware isolation technologies (Intel SGX, AMD SEV, ARM TrustZone) and ensure actual possession storage【887808116772823†L21-L31】.

#### OnliOne components
- **Onli (the asset)**: The unitary digital object – a Genome. It carries its own history and proves its integrity without referencing a global ledger【887808116772823†L21-L31】.
- **Onli You**: The application (mobile or desktop) that hosts a Vault and allows owners to interact with their assets. It includes an authenticator for secure identity.
- **Onli Cloud**: A functions-as-a-service (FaaS) environment that orchestrates issuance, transfers, AskToMove/Locker flows, Oracle registration and settlement. Onli Cloud never stores asset data; it logs receipts and ensures atomic transfers【887808116772823†L88-L100】.
- **Appliances**: Client or server applications built by developers on top of Onli Cloud. Appliances provide user experiences and enforce business rules. They call Onli Cloud’s gRPC APIs to mint, move, or destroy Genomes【887808116772823†L88-L100】.
- **Oracle**: The replicated validation oracle that records events (Issue, AskToMove, Locker, ChangeOwner) to provide verifiable receipts and anchor states off-chain.
- **Locker**: A settlement vault used to hold Genomes under conditions (payment, compliance or time). Movement through the Locker ensures atomic settlement.
- **Treasury & Mint**: Special vaults used by Issuers. Treasury holds unissued Genomes; Mint contains algorithms to create new Genomes.
