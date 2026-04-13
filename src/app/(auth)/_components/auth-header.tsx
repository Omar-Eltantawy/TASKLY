import Image from "next/image";
import Logo from "../../../../public/icons/logo.svg";
export default function AuthHeader() {
  return (
    <header className="py-7.5 px-10 w-full">
      <div className="flex gap-1 text-xl font-bold text-slate-dark ">
        <Image
          src={Logo}
          alt="Logo"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="uppercase">taskly</span>
      </div>
    </header>
  );
}
