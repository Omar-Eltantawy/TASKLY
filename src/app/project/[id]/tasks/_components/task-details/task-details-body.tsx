type Props = {
  description: string;
  saving: boolean;
  onChange: (val: string) => void;
  onBlur: () => void;
};

export default function TaskDetailsBody({
  description,
  saving,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="ps-10 pt-10 flex flex-col gap-2">
      <span className="text-[.625rem] text-slate-medium font-bold uppercase">
        Description
      </span>
      <textarea
        value={description}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={saving}
        rows={4}
        placeholder="No description provided."
        className="w-full text-sm text-gray-700 leading-relaxed outline-none
          border-none rounded-sm px-2 py-1.5 resize-none bg-transparent
          placeholder:text-slate-medium disabled:opacity-60"
      />
    </div>
  );
}
