export default function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-12 bg-secondary/40" />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-secondary"
        aria-hidden="true"
      >
        <path
          d="M12 2L14.5 9.5H22L16 14L18 21.5L12 17L6 21.5L8 14L2 9.5H9.5L12 2Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
      <span className="h-px w-12 bg-secondary/40" />
    </div>
  );
}
