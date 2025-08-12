import apiClient from "@/lib/apiClient";
import { AuthUserResponseType } from "@/types/auth";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<AuthUserResponseType | null>();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await apiClient<AuthUserResponseType>("auth/profile");
      setUser(data);
    };
    getUser();
  }, []);

  return user;
};

export default useUser;
