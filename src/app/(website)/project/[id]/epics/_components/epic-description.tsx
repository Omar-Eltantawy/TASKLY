"use client";

type Props = {
  description: string;
  setDescription: (v: string) => void;
  onBlur: () => void;
  saving: boolean;
};

export default function EpicDescription({
  description,
  setDescription,
  onBlur,
  saving,
}: Props) {
  return (
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onBlur={onBlur}
      disabled={saving}
      rows={3}
      placeholder="No description provided."
      className="w-full text-sm text-gray-700 leading-relaxed
        outline-none border border-transparent rounded-sm px-2 py-1.5
        focus:border-primary bg-transparent hover:bg-gray-50
        focus:bg-white transition-colors resize-none
        placeholder:text-slate-medium disabled:opacity-60"
    />
  );
}
