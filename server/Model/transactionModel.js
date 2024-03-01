// transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

  amount: {type: Number, required: true },
  buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  nftId: {type: String, required: true},
  txnhash:{type: String ,  required:true , },
  seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timestamp: {type: Date, default: Date.now},
  
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
