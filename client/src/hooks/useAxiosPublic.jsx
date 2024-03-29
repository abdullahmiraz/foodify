import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://foodify-bd.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
