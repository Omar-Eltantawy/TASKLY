import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "../lib/utils/tailwind-merge";
import searchIcon from "../../../public/icons/search.svg";
import Image from "next/image";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
  parentClassName?: string;
};

export default function Input({
  label,
  error,
  className,
  parentClassName,
  type,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col mb-6", parentClassName)}>
      <label
        className={cn(
          "text-[.625rem] uppercase font-bold mb-1.5",
          error ? "text-error" : " text-[#737685]",
        )}
      >
        {label}
      </label>
      <div className="relative">
        {type === "search" && (
          <Image
            src={searchIcon}
            alt="searsc"
            width={16}
            height={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          {...props}
          className={cn(
            "outline-none text-sm font-normal py-3 rounded-sm",
            type === "search" ? "pl-10 pr-4" : "px-4",
            error
              ? "bg-[#FFDAD6] text-error placeholder:text-error "
              : "bg-surface-highest text-[#6B7280]  placeholder:text-[#6B7280] ",
            className,
          )}
        />
      </div>
      {error && <p className="text-error text-xs mt-1">{error.message}</p>}
    </div>
  );
}
