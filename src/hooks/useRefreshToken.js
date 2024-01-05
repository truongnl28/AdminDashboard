import { jwtDecode } from "jwt-decode";
import axiosPrivate from "../api/axios";
import { History } from "../context/NavigateSetter";

const userRefreshToken = () => {
  const storedAuth = localStorage.getItem("auth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post(
        "/Authens/renewToken",
        {
          accessToken: initialAuth?.accessToken,
          refreshToken: initialAuth?.refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${initialAuth?.accessToken}`,
          },
        }
      );

      const decodedToken = jwtDecode(response?.data?.data?.login?.accessToken);
      const roles = decodedToken.role;
      const authData = {
        accessToken: response?.data?.data?.login?.accessToken,
        refreshToken: response?.data?.data?.login?.refreshToken,
        roles: roles,
        // Các thông tin khác cần thiết
      };
      localStorage.setItem("auth", JSON.stringify({ ...authData }));
      return response.data.accessToken;
    } catch (error) {
      // Xử lý lỗi
      if (error.response && error.response.status === 400) {
        if (History.navigate) History.navigate(`/login`);
        localStorage.removeItem('auth');
      } else {
        console.error("Lỗi khi làm mới token:", error);
      }

      // Rethrow lỗi để có thể xử lý nó ở các thành phần khác
      throw error;
    }
  };
  return refresh;
};

export default userRefreshToken;
