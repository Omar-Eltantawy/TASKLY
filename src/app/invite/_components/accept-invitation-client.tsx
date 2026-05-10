"use client";
import Image from "next/image";
import Logo from "../../../../public/icons/logo.svg";
import InvitationIcon from "../../../../public/icons/invitation.svg";
import Button from "@/shared/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptInvitationAction } from "@/shared/lib/actions/accept-invitation.action";

type State = "idle" | "loading" | "success" | "error";

export default function AcceptInvitationClient({
  token,
}: {
  token: string | undefined;
}) {
  const router = useRouter();

  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const handleAccept = async () => {
    if (!token) return;

    setState("loading");
    setError(null);

    const result = await acceptInvitationAction(token);

    if (!result.success) {
      setState("error");
      setError(result.error);
      return;
    }

    setState("success");
    setTimeout(() => router.push("/project"), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex gap-1 text-xl font-bold text-slate-dark">
        <Image
          src={Logo}
          alt="Logo"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="uppercase">taskly</span>
      </div>
      <div className="p-12 mt-12 w-3/4 lg:w-1/3  bg-white  flex flex-col items-center justify-center border-t-3 border-t-primary rounded-md">
        <span className="flex items-center gap-2 bg-surface-highest rounded-2xl py-1 px-4">
          <Image
            src={InvitationIcon}
            alt="InvitationIcon"
            width={12}
            height={12}
            className="object-contain"
          />
          <p className="text-xs">New Project Invitation</p>
        </span>
        <h3 className="text-3xl font-bold  text-center my-4">
          You&apos;ve been invited to join new project
        </h3>
        {state === "error" && error && (
          <div className="mb-6 px-4 py-3 rounded-sm bg-[#FFDAD6] text-error text-sm">
            {error}
          </div>
        )}
        <Button onClick={handleAccept} className="w-full">
          Accept Invitation
        </Button>
      </div>
    </div>
  );
}
