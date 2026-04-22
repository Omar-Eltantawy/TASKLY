"use client";

import { useState } from "react";
import LogoutArrowIcon from "../../../../public/icons/logout-arrow.svg";
import Image from "next/image";
import { logoutAction } from "@/shared/lib/actions/logout.action";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/features/user/slice";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";

type UserAvatarProps = {
  name: string;
  className?: string;
};

export default function UserAvatar({ name, className }: UserAvatarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await logoutAction();
    if (res !== true) {
      alert("Logout failed, please try again.");
      return;
    }
    dispatch(clearUser());
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center justify-center rounded-xl  bg-primary-container text-white font-semibold text-sm  cursor-pointer select-none",
          className ?? "w-10 h-10",
        )}
      >
        {getNameInitials(name)}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-error p-3 text-sm cursor-pointer justify-center mx-auto"
          >
            <Image src={LogoutArrowIcon} alt="Logout" width={18} height={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
