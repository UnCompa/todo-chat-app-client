import React from "react";
import { cn } from "../../utils/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  className?: string;
  variant?: "default" | "outline" | "underline" | "ghost";
  // 👆 ghost = sin fondo, solo placeholder
}

function Input({
  label,
  errorMessage,
  className,
  variant = "default",
  ...props
}: Props) {
  const baseStyles =
    "w-full px-3 py-2 text-sm rounded-md transition-all duration-200 font-WorkSans";

  const variants = {
    default:
      "bg-bg border border-border text-text focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
    outline:
      "border border-border text-text bg-transparent focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
    underline:
      "border-b border-border bg-transparent rounded-none focus:border-primary-500 focus:ring-0",
    ghost:
      "bg-transparent border-none placeholder:text-placeholder focus:ring-0 focus:outline-none", // 👈 el que quieres: solo placeholder
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-text font-WorkSans text-sm">{label}</label>
      )}
      <input
        className={cn(baseStyles, variants[variant], className)}
        type="text"
        {...props}
      />
      {errorMessage && (
        <span className="text-sm text-danger-500">{errorMessage}</span>
      )}
    </div>
  );
}

export default Input;
