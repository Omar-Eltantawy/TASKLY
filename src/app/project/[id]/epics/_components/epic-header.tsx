"use client";

import Image from "next/image";
import Button from "@/shared/ui/button";
import EpicIdIcon from "../../../../../../public/icons/epic-id.svg";

type Props = {
  epicId: string;
  title: string;
  setTitle: (v: string) => void;
  onBlur: () => void;
  saving: boolean;
  onClose: () => void;
};

export default function EpicHeader({
  epicId,
  title,
  setTitle,
  onBlur,
  saving,
  onClose,
}: Props) {
  return (
    <div className="flex items-start justify-between p-4 sm:p-6 border-b border-[#F1F3FF]">
      <div className="flex-1 min-w-0 pr-4">
        <span className="text-xs font-bold text-slate-500 px-2 py-1 rounded-sm flex items-center gap-1">
          <Image src={EpicIdIcon} height={14} width={14} alt="epic-id-icon" />
          {epicId}
        </span>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={onBlur}
          disabled={saving}
          className="mt-2 w-full text-xl font-semibold text-gray-900
            outline-none border-b-2 border-transparent
            focus:border-primary bg-transparent transition-colors
            disabled:opacity-60"
        />
      </div>

      <Button
        variant="secondary"
        onClick={onClose}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-all shrink-0"
      >
        x
      </Button>
    </div>
  );
}
