"use client";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const styles = {
  primary:
    "bg-gradient-to-r from-[#003D9B] to-[#0052CC] text-white font-semibold hover:from-[#0052CC] hover:to-[#003D9B] ",
  secondary:
    "bg-transparent text-primary font-semibold hover:border hover:border-primary transition  ",
  ghost:
    "bg-transparent text-slate-medium hover:border hover:border-slate-medium transition",
};

export default function Button({
  variant = "primary",
  onClick,
  className,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-4 cursor-pointer bg-primary rounded-sm text-sm capitalize hover:scale-95 disabled:cursor-no-drop transition-all duration-300 ${styles[variant]} ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
