"use client";

import { ProjectMember } from "@/shared/lib/types/project";

type Props = {
  value: string;
  members: ProjectMember[];
  saving: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
};

export default function AssigneeSelect({
  value,
  members,
  saving,
  onChange,
  onBlur,
}: Props) {
  return (
    <select
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={saving}
      className="w-full
        text-xs sm:text-sm md:text-base
        text-gray-700
        outline-none
        border border-transparent rounded-sm
        px-2 py-2 sm:py-1.5
        hover:bg-gray-50 focus:border-primary focus:bg-white
        bg-transparent transition-colors cursor-pointer
        disabled:opacity-60"
    >
      <option value="">Unassigned</option>

      {members.map((member) => (
        <option key={member.user_id} value={member.user_id}>
          {member.metadata.name}
        </option>
      ))}
    </select>
  );
}
