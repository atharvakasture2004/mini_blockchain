# Mini Blockchain Simulator

A simple JS console app simulating a blockchain with mining (prime-based puzzle), tamper detection, and basic transaction balances.

## Features
- Proof-of-Work mining using nonce + prime mod puzzle.
- Chain validation (hashes match).
- Transaction parsing for user balances (e.g., "Alice pays Bob 10 coins").
- Async mining for non-blocking.

## Setup
1. Node.js installed.
2. `npm init -y` (if not done).
3. Run: `node index.js`.

## Files
- `block.js`: Block class with hash/mining.
- `blockchain.js`: Chain manager with add/validate/balances.
- `index.js`: Demo script.

## Example Output
Mines blocks, logs chain, validity (true/false on tamper), balances.

## Improvements
- Add real difficulty adjustment.
- Persist to file/DB.
- UI with Express/React.

Built while learning Web3 from basics! 🚀
