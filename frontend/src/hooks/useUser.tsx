import { AuthUserResponseType } from "@/types/auth";
import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState<AuthUserResponseType | null>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  const getUser = () => user;

  const removeUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return { getUser, removeUser };
};

export default useUser;
