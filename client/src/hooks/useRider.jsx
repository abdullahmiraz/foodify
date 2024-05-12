import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRider = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isRider, isPending: isRiderLoading } = useQuery({
    queryKey: [user?.email, "isRider"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking or checking if rider", user);
      const res = await axiosSecure.get(`/users/rider/${user.email}`);
      return res.data?.rider;
    },
  });
  return [isRider, isRiderLoading];
};

export default useRider;
