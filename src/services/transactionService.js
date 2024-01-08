import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListTransaction = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/TransactionItem/list-all-transaction-item`);
  };
}
export const transactionService = new Private();
