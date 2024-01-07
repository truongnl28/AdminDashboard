import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListCategory = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/Category/Get-Category-list`);
  };
  createCategory = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.post(`/Category/Post-Category`, data);
  };
  updateCategory = async (data, categoryId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.put(`/Category/Update-Category?id=${categoryId}`, data);
  };
  deleteCategory = async (categoryId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/Category/Delete-Category?id=${categoryId}`);
  };
}
export const categoryService = new Private();
