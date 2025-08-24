import { Block } from './block.js';

export class Blockchain {
  constructor(target = 1000) {
    this.chain = [this.createGenesisBlock()];
    this.target = target;
    this.users = {};
  }

  createGenesisBlock() {
    const genesis = new Block(0, 'Genesis Block');
    genesis.mineBlock(this.target);
    return genesis;
  }

  async addBlock(newData) {
    if (typeof newData !== 'string' || newData.trim() === '') {
      throw new Error('Data must be a non-empty string');
    }
    const prevBlock = this.chain[this.chain.length - 1];
    const newBlock = new Block(this.chain.length, newData, prevBlock.currentHash);
    await newBlock.mineBlock(this.target);
    this.chain.push(newBlock);
    this.updateBalances(newBlock);
  }

  updateBalances(block) {
    const data = block.data;
    try {
      
      const match = data.match(/(\w+)\s*pays\s*(\w+)\s*(\d+)\s*coins?/i);
      if (!match) throw new Error('Invalid tx format');
      
      const payer = match[1].trim();
      const payee = match[2].trim();
      const amount = parseInt(match[3], 10);
      
      if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount');

      if (!this.users[payer]) this.users[payer] = 0;
      if (!this.users[payee]) this.users[payee] = 0;

      this.users[payer] -= amount;
      this.users[payee] += amount;
    } catch (e) {
      console.error(`Skipping invalid tx in block ${block.index}: ${e.message}`);
      
    }
  }

  getBalance(user) {
    return this.users[user] || 0;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      if (current.currentHash !== current.calculateHash() || prev.currentHash !== current.prevHash) {
        return false;
      }
    }
    return true;
  }
}