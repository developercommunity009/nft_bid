// transactionController.js

const Transaction = require('../Model/transactionModel');

// Controller to initiate a new transaction
exports.createTransaction = async (req, res) => {
  try {
  
    const newTransaction = await Transaction.create(req.body);
    await newTransaction.save();
    // Update user balances or perform other necessary actions
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get transaction details by transaction ID
exports.getTransactionById = async (req, res) => {
     const {tokenId} = req.params;
     console.log(tokenId);
  try {
    const transaction = await Transaction.findOne({nftId :tokenId})
      .populate('buyer') // Populate buyer details
      .populate('seller') // Populate seller details
      .populate('nft'); // Populate NFT details

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
