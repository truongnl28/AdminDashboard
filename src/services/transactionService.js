import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListTransaction = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/TransactionItem/list-all-transaction-item`);
  };

  getListTransactionPoint = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/TransactionPoint/list-all-transaction`);
  };
  getListTransactionPointDetail = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/TransactionPoint/get-transaction-by-id?id=${data}`);
  };
}
export const transactionService = new Private();
