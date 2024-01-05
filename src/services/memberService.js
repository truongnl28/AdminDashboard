import userAxiosPrivate from "../hooks/useAxiosPrivate";

export class Private {
  getListMember = async () => {
    const axiosPrivate = userAxiosPrivate();
    // const enCodeName = encodeURIComponent(data.name);
    return await axiosPrivate.get(`/Members`);
  };
}
export const memberService = new Private();
