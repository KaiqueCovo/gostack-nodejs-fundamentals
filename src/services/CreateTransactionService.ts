import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

/**
 * Interface from method execute
 */
interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  /**
   * Method execute
   * @param title string
   * @param value number
   * @param type income | outcome
   */
  public execute({ title, value, type }: RequestDTO): Transaction {
    /**
     * Create Transaction
     */
    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    /**
     * Get total from the Transactions Repository
     */
    const { total } = this.transactionsRepository.getBalance();

    /**
     * Check if value is more that total
     */
    if (value > total) {
      throw Error("You don't have this value");
    }

    return createTransaction;
  }
}

export default CreateTransactionService;
