import UserAvatar from "./user-avatar";
import { User } from "@/shared/lib/types/user";
import burgerIcon from "../../../../public/icons/burger.svg";
import LogoIcon from "../../../../public/icons/logo.svg";
import Image from "next/image";
type Props = {
  onMenuClick: () => void;
  user: User | null;
};

export default function Navbar({ onMenuClick, user }: Props) {
  const name = user?.name || "User";
  const department = user?.department || "Department";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 py-3
      bg-white  top-0 z-30 w-full border-b border-[#0000001A]"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Image src={burgerIcon} alt="Menu" width={20} height={20} />
        </button>
        <span className={`hidden lg:flex items-center gap-2 ps-1.5`}>
          <Image src={LogoIcon} alt="Logo" width={20} height={20} />
          <span className="font-bold text-xl">TASKLY</span>
        </span>
      </div>

      <div className="flex items-center gap-3 ml-auto font-bold">
        <div className="text-right hidden sm:block">
          <p className="text-sm  text-gray-900 leading-tight">{name}</p>
          <p className="text-[.65rem] text-primary uppercase">{department}</p>
        </div>
        <UserAvatar name={name} />
      </div>
    </header>
  );
}
