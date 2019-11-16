import * as Web3L from 'web3';
import { range } from 'lodash';

import { INFURA_KEY } from '../config';

export class Web3 {
  constructor () {
    // Set the provider
    let url = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
    this.web3 = new Web3L(new Web3L.providers.HttpProvider(url));
  }

  getLatestBlocks = async () => {
    const latest = await this.web3.eth.getBlockNumber();
    const blockNumbers = range(latest - 9, latest + 1, 1);
    // const batch = new this.web3.eth.BatchRequest();
    const blocks = [];

    const storeBlock = (obj) => {
      blocks.push(obj);
    };

    for (let i of blockNumbers) {
      // await this.web3.eth.getBlock(i, storeBlock)
      await this.web3.eth.getBlock(i).then(storeBlock);
    }

    // blockNumbers.forEach(blockNumber => {
    //   batch.add(
    //     this.web3.eth.getBlock.request(blockNumber, storeBlock)
    //   );
    // });

    // await batch.execute();

    return blocks.reverse();
  }

  getTxFromBlock = async (number, id) => {
    const transaction = await this.web3.eth.getTransactionFromBlock(number, id);
    return transaction;
  }

  getTx = async txHash => {
    return await this.web3.eth.getTransaction(txHash);
  }
}