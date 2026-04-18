"use client";

import { cn } from "@/shared/lib/utils/tailwind-merge";

type PasswordRulesProps = {
  password: string;
};

function hasMinLength(p: string) {
  return p.length >= 8;
}

function hasUppercaseAndLowercaseAndDigit(p: string) {
  return /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
}

function hasSpecialChar(p: string) {
  return /[!@#$%^&*]/.test(p);
}

export default function PasswordRules({ password }: PasswordRulesProps) {
  const rules = [
    { label: "At least 8 characters", valid: hasMinLength(password) },
    {
      label: "One uppercase, lowercase, digit",
      valid: hasUppercaseAndLowercaseAndDigit(password),
    },
    { label: "One special character", valid: hasSpecialChar(password) },
  ];

  return (
    <div className="mt-3 mb-6 space-y-2 bg-surface-low p-4 rounded-sm text-[#434654]">
      {rules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold",
              rule.valid ? "border-2" : "border",
            )}
          >
            {rule.valid ? "✓" : ""}
          </span>

          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
}
