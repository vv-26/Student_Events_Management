// src/components/GradientButton.jsx
// Reusable gradient button with hover/active animations and loading state

/**
 * GradientButton
 * Props:
 *   children   — button text
 *   onClick    — click handler
 *   type       — button type (submit | button)
 *   loading    — shows spinner when true
 *   variant    — "primary" | "outline" | "ghost"
 *   className  — extra Tailwind classes
 *   disabled   — disables the button
 */
export default function GradientButton({
  children,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-transparent";

  const variants = {
    primary:
      "bg-brand-gradient text-white px-6 py-3.5 text-[15px] shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
    outline:
      "border border-violet-500/40 text-violet-300 hover:border-violet-400 hover:text-violet-200 hover:bg-violet-500/10 px-6 py-3.5 text-[15px] active:scale-[0.98]",
    ghost:
      "text-violet-400 hover:text-violet-200 hover:bg-violet-500/10 px-4 py-2 text-sm active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {/* Gradient shimmer overlay on hover */}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-xl bg-white/0 hover:bg-white/5 transition-colors duration-200 pointer-events-none" />
      )}

      {/* Spinner */}
      {loading && (
        <svg
          className="animate-spin"
          width="18" height="18" fill="none" viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
        </svg>
      )}

      {children}
    </button>
  );
}
