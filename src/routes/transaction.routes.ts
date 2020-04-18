import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

/**
 * Instance from Transactions Repository
 */
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    /**
     * Get all transactions from the Transactions Repository
     */
    const transactions = transactionsRepository.all();

    /**
     * Get Balance from the Transactions Repository
     */
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    /**
     * Destructuring request
     */
    const { title, value, type } = request.body;

    /**
     * We passed the Transactions Repository to the creation service
     */
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    /**
     * Execute method from create transaction
     */
    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
