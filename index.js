import { Blockchain } from './blockchain.js';

(async () => { 
  const simulator = new Blockchain(10000); 

  await simulator.addBlock('Tx1: Alice pays Bob 10 coins');
  await simulator.addBlock('Tx2: Bob pays Charlie 5 coins');

  console.log('Chain:', simulator.chain);
  console.log('Valid?', simulator.isChainValid()); 

  // Tamper
  simulator.chain[1].data = 'Hacked Tx';
  console.log('Valid after tamper?', simulator.isChainValid()); 

  // Test balances
  console.log('Alice balance:', simulator.getBalance('Alice')); 
  console.log('Bob balance:', simulator.getBalance('Bob')); 
  console.log('Charlie balance:', simulator.getBalance('Charlie')); 
})();
