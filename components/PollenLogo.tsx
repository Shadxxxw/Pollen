import type { HTMLAttributes } from 'react';

export function PollenLogo({ className, ...props }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M31.9998 6C39.5 16 52 19 52 32C52 44.1503 42.1503 54 30 54C17.8497 54 8 44.1503 8 32C8 19 20.5 16 31.9998 6Z"
        fill="#FFC12F"
      />
      <path
        d="M22 36C24.8 31.2 30.1 28 36 28"
        stroke="#784112"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M24 42C27.2 38.2 31.6 36 36.5 36"
        stroke="#784112"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="24" r="6" fill="#F4AA0A" />
    </svg>
  );
}
