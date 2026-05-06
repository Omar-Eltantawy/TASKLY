"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import InviteForm from "./invite-form";
import Image from "next/image";
import addMember from "../../../../../../public/icons/new-member.svg";
type Props = {
  projectId: string;
  onClose: () => void;
};

export default function InviteModal({ projectId, onClose }: Props) {
  // Close on ESC + lock body scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#041B3C33] z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-md shadow-[0_48px_24px_0_#041B3C1A] p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex flex-col  justify-between px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-surface-low p-3">
                <Image
                  src={addMember}
                  alt="addNewMember"
                  height={20}
                  width={20}
                />
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Invite Team Member
              </h2>
              <p className="text-sm text-slate-medium">
                Send an invitation to join the Architectural Studio
                workspace.{" "}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-2">
            <InviteForm projectId={projectId} onSuccess={onClose} />
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
