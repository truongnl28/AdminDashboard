import { axiosPrivate } from "../api/axios";
import userRefreshToken from "./useRefreshToken";

let requestIntercept = null;
let responseIntercept = null;

const cleanupInterceptors = () => {
    if (requestIntercept !== null) {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        requestIntercept = null;
    }

    if (responseIntercept !== null) {
        axiosPrivate.interceptors.response.eject(responseIntercept);
        responseIntercept = null;
    }
};

const userAxiosPrivate = () => {
    const refresh = userRefreshToken();
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};

    cleanupInterceptors();

    requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${initialAuth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }

    );


    return axiosPrivate;
}

export default userAxiosPrivate;