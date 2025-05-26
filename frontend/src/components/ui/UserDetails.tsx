import useStateCustom from "@/hooks/useFetchState";
import apiClient from "@/lib/apiClient";
import { AuthUserResponseType } from "@/types/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserDetails = () => {
  const { setData, data } = useStateCustom<AuthUserResponseType>();

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    setData(user);
  }, []);

  const handleLogout = async () => {
    const { error, status } = await apiClient("logout", {
      method: "POST",
    });

    if (status >= 200 && status < 300 && !error) {
      localStorage.removeItem("user");
      setData(null);
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-on-surface space-y-5 lg:w-[30rem] w-full h-[13rem] flex flex-col justify-between border border-on-surface lg:rounded-l-xl overflow-hidden">
      <div className="flex gap-5 h-[55%] m-6 ">
        <div className="image relative h-full aspect-square rounded-lg overflow-hidden shadow-md">
          <Image
            src={"/profile.png"}
            objectFit="cover"
            layout="fill"
            alt="profile
        "
          />
        </div>
        <div className="rounded-md py-4 flex flex-col justify-between">
          <div className="-space-y-1">
            <h2 className="2xl:text-2xl text-xl capitalize text-basec font-semibold tracking-wider">
              {data?.username}
            </h2>
            <p className="text-muted 2xl:text-base text-sm">id:{data?.id}</p>
          </div>
          <p className="font-medium text-basec 2xl:text-xl text-lg tracking-wider line-clamp-1">
            {data?.email}
          </p>
        </div>
      </div>
      <button
        className="bg-primary w-full flex items-center justify-center py-3 hover:bg-secondary duration-200 text-on-surface text-lg font-semibold tracking-wide"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDetails;
