"use client";

import useUser from "@/hooks/useUser";
import apiClient from "@/lib/apiClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserDetails = () => {
  const router = useRouter();
  const user = useUser();

  const handleLogout = async () => {
    const { status } = await apiClient("auth/logout", {
      method: "POST",
    });

    if (status >= 200 && status < 300) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-radius-lg shadow-2xl overflow-hidden bg-on-surface border border-muted lg:w-[30rem] w-[20rem]">
      <div className="p-4 flex items-center justify-between space-x-6">
        <div className="flex gap-5 items-center justify-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-primary-500">
            <Image
              src="/profile.png"
              layout="fill"
              objectFit="cover"
              alt="User Profile"
            />
          </div>
          <div className="flex-1 min-w-0">
            {user ? (
              <>
                <h2 className="text-xl font-semibold text-primary capitalize truncate">
                  {user.name}
                </h2>
                <p className="mt-1 text-sm text-strong truncate">
                  {user.email}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">ID:</span> {user.id}
                </p>
              </>
            ) : (
              <p className="text-muted dark:text-gray-300">Loading...</p>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="hover:bg-muted p-2 rounded-full duration-150"
        >
          <RiLogoutBoxRLine size={20} />
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-muted h-px"></div>
      <div className="px-6 py-4 text-sm text-basec">
        <p>Welcome back! Here’s your account overview.</p>
      </div>
    </div>
  );
};

export default UserDetails;
