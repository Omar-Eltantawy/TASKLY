"use client";

import InviteModalDesktop from "./invite-modal-desktop";
import InviteModalMobile from "./invite-modal-mobile";

type Props = {
  projectId: string;
  open: boolean;
  onClose: () => void;
};

export default function InviteModalGlobal({ projectId, open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <InviteModalDesktop
        className="hidden md:block"
        projectId={projectId}
        onClose={onClose}
      />

      <InviteModalMobile
        className="block md:hidden"
        projectId={projectId}
        onClose={onClose}
      />
    </>
  );
}
