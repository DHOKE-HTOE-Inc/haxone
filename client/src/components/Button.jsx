export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full h-[50px] rounded-[10px] bg-accent text-lg font-[500] text-secondary hover:bg-accent-hover outline-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
