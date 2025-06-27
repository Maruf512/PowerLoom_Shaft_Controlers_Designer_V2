"use client";

import { navlinks } from "@/constants/Nav";
import useUser from "@/hooks/useUser";
import { AuthUserResponseType } from "@/types/auth";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { IoCaretBackSharp } from "react-icons/io5";
import { Modal, ModalContent } from "../ui/Modal";
import UserDetails from "../ui/UserDetails";
import Overlay from "../ui/Overlay";

const NavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const user = useMemo(() => {
    return useUser().getUser() as AuthUserResponseType;
  }, []);

  return (
    <div className="bg-surface rounded-radius-lg border border-muted lg:text-sm text-xs flex justify-between items-center h-[3rem]">
      <div className="flex justify-center items-center h-full">
        <div
          className="bg-primary text-muted flex items-center justify-center px-4 rounded-l-radius-lg cursor-pointer h-full"
          onClick={() => router.back()}
        >
          <IoCaretBackSharp />
        </div>
        <div className="w-fit space-x-4 lg:px-6 px-3">
          {navlinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "inline-block transition-transform duration-100 ease-in-out",
                path === link.path ? "font-semibold" : "translate-y-0 scale-95"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:px-6 px-3 flex items-center justify-center gap-3 relative">
        {/* <p className="capitalize font-semibold text-sm">{user?.username}</p> */}
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src={"/profile.png"}
            objectFit="cover"
            layout="fill"
            alt="profile"
          />
        </div>
        <Overlay
          setIsOpen={setIsOpen}
          className={cn(
            "absolute top-12 right-0 z-30 duration-150 ease-in-out",
            isOpen
              ? "opacity-100"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <UserDetails />
        </Overlay>
      </div>
    </div>
  );
};

export default NavBar;
