import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListRadius = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/RadiusConfigs`);
  };
  createRadius = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.post(`/RadiusConfigs?radius=${data.radius}&isDefault=${data.isDefault}`);
  };
  updateRadius = async (data, radiusId) => {
    const axiosPrivate = userAxiosPrivate();
    if(data?.isDefault){
      return await axiosPrivate.put(`/RadiusConfigs/update-radius?id=${radiusId}&radius=${data.radius}&isDefault=${data.isDefault}`);
    }else{
      return await axiosPrivate.put(`/RadiusConfigs/update-radius?id=${radiusId}&radius=${data.radius}`);
    }
  };
  deleteRadius = async (radiusId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/RadiusConfigs/delete-radius?id=${radiusId}`);
  };
}
export const radiusService = new Private();
