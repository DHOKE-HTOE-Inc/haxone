export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full h-[50px] rounded-[10px] bg-[var(--color-accent)] text-lg font-[500] text-white hover:bg-[var(--color-accent-hover)] outline-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
