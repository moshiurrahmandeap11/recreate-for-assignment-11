import axios from "axios";
import { useAuth } from "../UseAuth/UseAuth";
import Loading from "../../components/Loading/Loading";

const axiosInstance = axios.create({
  baseURL: "https://coursion-server.vercel.app/",
});

const UseAxios = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use((response) => {
    return response;
  }),
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logout()
          .then(() => {
            console.log("sign out user for 401 status code");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    };

  return axiosInstance;
};

export default UseAxios;
