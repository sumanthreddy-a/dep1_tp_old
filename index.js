const {
    TransactionProcessor
} = require('sawtooth-sdk/processor')

const Handler = require('./src/handler')

const transactionProcessor = new TransactionProcessor('tcp://159.65.157.166:4040')

transactionProcessor.addHandler(new Handler())
transactionProcessor.start()

console.log(`Starting  Handler transaction processor`)