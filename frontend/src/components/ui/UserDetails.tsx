import useFetchState from "@/hooks/useFetchState";
import apiClient from "@/lib/apiClient";
import { AuthUserResponseType } from "@/types/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserDetails = () => {
  const { setData, data } = useFetchState<AuthUserResponseType>();

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    setData(user);
  }, [setData]);

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
    <div className="bg-on-surface lg:w-[30rem] flex justify-between lg:rounded-radius-lg rounded-radius-sm overflow-hidden border border-muted">
      <div className="flex items-center h-[4.5rem] gap-5 my-4 mx-5">
        <div className="image relative h-[70%] aspect-square rounded-md overflow-hidden ">
          <Image
            src={"/profile.png"}
            objectFit="cover"
            layout="fill"
            alt="profile
        "
          />
        </div>
        <div className="rounded-md flex flex-col justify-between">
          {data && (
            <>
              <div>
                <h2 className="2xl:text-2xl text-xl capitalize text-strong font-semibold tracking-wider">
                  {data?.username}
                </h2>
                <p className="text-basec text-xs">ID:{data?.id}</p>
              </div>
              <p className="font-medium text-strong tracking-wider line-clamp-1">
                {data?.email}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="h-full flex items-center">
        <button
          className="mx-5 text-primary hover:bg-primary px-4 py-4 rounded-radius-sm duration-200 hover:text-on-surface"
          onClick={handleLogout}
        >
          <RiLogoutBoxRLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
