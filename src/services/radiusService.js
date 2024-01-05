import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListRadius = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/RadiusConfigs`);
  };
  createRadius = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.post(`/RadiusConfigs?radius=${data}`,);
  };
  updateRadius = async (data, radiusId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.put(`/RadiusConfigs/update-radius?id=${radiusId}&radius=${data}`);
  };
  deleteRadius = async (radiusId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/RadiusConfigs/delete-radius?id=${radiusId}`);
  };
}
export const radiusService = new Private();
