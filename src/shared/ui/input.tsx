import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col mb-6">
      <label
        className={`text-[.625rem] uppercase font-bold mb-1.5
         ${error ? "text-error" : " text-[#737685]"} `}
      >
        {label}
      </label>
      <input
        {...props}
        className={` outline-none text-sm font-normal px-4 py-3 rounded-sm
          ${error ? "bg-[#FFDAD6] text-error placeholder:text-error " : "bg-surface-highest text-[#6B7280]  placeholder:text-[#6B7280] "}
          ${className}`}
      />
      {error && <p className="text-error text-xs mt-1">{error.message}</p>}
    </div>
  );
}
