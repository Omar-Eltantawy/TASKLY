"use client";

import { createPortal } from "react-dom";
import InviteForm from "./invite-form";
import Image from "next/image";
import addMember from "../../../../../../public/icons/new-member.svg";
import { useEffect } from "react";

type Props = {
  projectId: string;
  onClose: () => void;
  className?: string;
};

export default function InviteModalMobile({
  projectId,
  onClose,
  className,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={className}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Bottom sheet */}
      <div className="fixed inset-0 z-50 flex items-end">
        <div
          className="w-full bg-white rounded-t-2xl p-5 animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle */}
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-4">
            <div className="bg-surface-low p-3">
              <Image
                src={addMember}
                alt="addNewMember"
                width={20}
                height={20}
              />
            </div>

            <button onClick={onClose}>✕</button>
          </div>

          <h2 className="text-lg font-semibold mb-2">Invite Team Member</h2>
          <p className="text-sm text-slate-medium">
            Send an invitation to join the Architectural Studio workspace.{" "}
          </p>

          <InviteForm projectId={projectId} onSuccess={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
