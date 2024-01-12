import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListItem = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/Items/get-all-item-by-admin`);
  };
  getListItemRegister = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/ItemPreference/get-member-by-itemId/${data}`);
  };
  getDetailItem = async (itemId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/Items/get-item-by-id/${itemId}`);
  };

  deleteItem = async (itemId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/Items/delete-item/${itemId}`);
  };
}
export const itemService = new Private();
