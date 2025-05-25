import useStateCustom from "@/hooks/useAuth";
import { AuthUserResponseType } from "@/types/auth";
import React, { useEffect } from "react";

const UserDetails = () => {
  const { setData, data } = useStateCustom<AuthUserResponseType>();

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    setData(user);
  }, []);

  console.log(data);

  return (
    <div>
      <div className="">
        <div className="image"></div>
        <div className="details">
          <h2>{data?.username}</h2>
          <div>
            <p>{data?.email}</p>
            <p>id:{data?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
