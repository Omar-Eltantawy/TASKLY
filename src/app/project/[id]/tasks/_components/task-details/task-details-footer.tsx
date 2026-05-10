"use client";
import Image from "next/image";
import copyIcon from "../../../../../../../public/icons/copy.svg";
import Button from "@/shared/ui/button";
import { useState } from "react";

type Props = { taskId: string; onClose: () => void };

export default function TaskDetailsFooter({ taskId, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}?taskId=${taskId}`;
    navigator.clipboard.writeText(url);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between px-10 py-3">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-slate-medium
          hover:text-primary transition-colors cursor-pointer"
      >
        <Image src={copyIcon} alt="copy" width={12} height={12} />
        {copied ? "Copied!" : "Copy link"}
      </button>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
