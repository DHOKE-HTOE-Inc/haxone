import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./Button";

export function FormInput({ icon: Icon, type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : type}
        className="w-full h-[50px] rounded-[10px] border border-[var(--color-primary)] bg-white px-5 text-lg outline-none placeholder:text-[#8D8D8D]"
        {...props}
      />
      {isPassword ? (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer outline-none"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <Eye size={24} strokeWidth={1.5} />
          ) : (
            <EyeOff size={24} strokeWidth={1.5} />
          )}
        </button>
      ) : (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-muted-gray)]">
          <Icon size={24} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

export function AuthForm({
  form,
  header,
  button,
  children,
  footer,
  className = "",
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-secondary)] px-4">
      <div
        className={`w-full max-w-[494px] rounded-[25px] bg-white px-5 sm:px-[70px] shadow-[0px_19px_42px_0px_rgba(174,173,173,0.10),0px_77px_77px_0px_rgba(174,173,173,0.09)] ${className}`}
      >
        <h1 className="text-center text-[30px] font-[500] text-[var(--color-primary)] mb-8">
          {header}
        </h1>
        <form className="space-y-6 w-full" {...form}>
          {children}
          <Button type="submit">{button}</Button>
        </form>
      </div>
      {footer && (
        <div className="mt-4 text-lg text-[var(--color-muted-gray)]">
          {footer}
        </div>
      )}
    </div>
  );
}
