import * as Web3L from 'web3';
import { range } from 'lodash';

import { INFURA_KEY } from '../config';

export class Web3 {
  constructor () {
    // Set the provider
    let url = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
    this.web3 = new Web3L(new Web3L.providers.HttpProvider(url));
  }

  getLatestBlocks = async cb => {
    const latest = await this.web3.eth.getBlockNumber();
    const blockNumbers = range(latest - 9, latest + 1, 1);
    const batch = new this.web3.eth.BatchRequest();
    const blocks = [];

    const storeBlock = (_, obj) => {
      if (obj) {
        blocks.push(obj);
      }
      if (blocks.length === 10) {
        cb(blocks.reverse());
      }
    };

    blockNumbers.forEach(blockNumber => {
      batch.add(
        this.web3.eth.getBlock.request(blockNumber, storeBlock)
      );
    });

    batch.execute();
  }

  getTxnsFromBlock = async (block, cb) => {
    const batch = new this.web3.eth.BatchRequest();
    const transactions = [];

    const storeTransaction = (_, obj) => {
      if (transactions.length === block.transactions.length) {
        cb(transactions);
      }
    };

    block.transactions.forEach(tx => {
      batch.add(
        this.web3.eth.getTransaction.request(tx.hash, storeTransaction)
      );
    });

    batch.execute();
  }

  getTxFromBlock = async (number, id) => {
    const transaction = await this.web3.eth.getTransactionFromBlock(number, id);
    return transaction;
  }

  getTx = async txHash => {
    return await this.web3.eth.getTransaction(txHash);
  }
}