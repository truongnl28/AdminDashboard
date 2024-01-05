import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListPoint = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/MemberPointConfig`);
  };
  // createPoint = async (data) => {
  //   const axiosPrivate = userAxiosPrivate();
  //   return await axiosPrivate.post(`/PointConfigs?Point=${data}`,);
  // };
  updatePoint = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.put(`/MemberPointConfig?point=${data}`);
  };
  // deletePoint = async (PointId) => {
  //   const axiosPrivate = userAxiosPrivate();
  //   return await axiosPrivate.delete(`/PointConfigs/delete-Point?id=${PointId}`);
  // };
}
export const pointService = new Private();
