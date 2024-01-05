import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListRank = async () => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.get(`/Rank/get-list`);
  };
  createRank = async (data) => {
    console.log("first", data);
    const axiosPrivate = userAxiosPrivate();
    const formData = new FormData();
      formData.append("rankName", data.rankName);
      formData.append("point", data.point);
      formData.append("imageUrl", data.imageURL, data.imageURL.name);
      return await axiosPrivate.post(`/Rank`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
  };
  updateRank = async (data, rankId) => {
    const formData = new FormData();
    const axiosPrivate = userAxiosPrivate();
    if (data) {
      formData.append("rankName", data.rankName);
      formData.append("point", data.point);
      if (data.image) {
        formData.append("imageUrl", data.image, data.image.name);
      }
    }
    return await axiosPrivate.put(`/Rank?id=${rankId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  };
  deleteRank = async (rankId) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/Rank?id=${rankId}`);
  };
}
export const rankService = new Private();
