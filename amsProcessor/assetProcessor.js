const { TransactionProcessor } = require('sawtooth-sdk/processor');
const AssetHandler = require('./AssetHandler');


const address = 'tcp://validator:4004';

const transactionProcesssor = new TransactionProcessor(address);

transactionProcesssor.addHandler(new AssetHandler());
transactionProcesssor.start(); 
