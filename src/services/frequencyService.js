import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListFrequency = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/FrequencyConfigs`);
  };
  createFrequency = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.post(`/FrequencyConfigs?frequency=${data}`,);
  };
  updateFrequency = async (data, frequencyId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.put(`/FrequencyConfigs/update-frequency?id=${frequencyId}&frequency=${data}`);
  };
  deleteFrequency = async (frequencyId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/FrequencyConfigs/delete-frequency?id=${frequencyId}`);
  };
}
export const frequencyService = new Private();
