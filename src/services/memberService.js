import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListMember = async () => {
    const axiosPrivate = userAxiosPrivate();
    // const enCodeName = encodeURIComponent(data.name);
    return await axiosPrivate.get(`/Members`);
  };
  getDetailMember = async (userId) => {
    const axiosPrivate = userAxiosPrivate();
    // const enCodeName = encodeURIComponent(data.name);
    return await axiosPrivate.get(`/Members/get-information-by-id?memberId=${userId}`);
  };
  deleteMember = async (data) => {
    const axiosPrivate = userAxiosPrivate();
    return await axiosPrivate.delete(`/Members/${data.userId}?isDelete=${data.isDelete}`);
  };
}
export const memberService = new Private();
