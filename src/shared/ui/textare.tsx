export default function Textarea({
  label,
  error,
  maxLength,
  currentLength = 0,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: { message?: string };
  maxLength?: number;
  currentLength?: number;
}) {
  return (
    <div className="flex flex-col mb-6">
      <label
        className={`text-[.625rem] uppercase font-bold mb-1.5
          ${error ? "text-error" : "text-[#737685]"}`}
      >
        {label}
      </label>
      <textarea
        {...props}
        maxLength={maxLength}
        rows={5}
        className={`outline-none text-sm font-normal px-4 py-3 rounded-sm resize-none
          ${
            error
              ? "bg-[#FFDAD6] text-error placeholder:text-error"
              : "bg-surface-highest text-[#6B7280] placeholder:text-[#6B7280]"
          }`}
      />
      <div className="flex justify-between mt-1.5">
        {error?.message ? (
          <span className="text-error text-[.625rem]">{error.message}</span>
        ) : (
          <span />
        )}
        {maxLength && (
          <span className="text-[.625rem] text-[#737685] ml-auto">
            {currentLength}/{maxLength} characters
          </span>
        )}
      </div>
    </div>
  );
}
