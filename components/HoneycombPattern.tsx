import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<SVGElement> & {
  patternId?: string;
};

export function HoneycombPattern({ className, patternId, ...props }: Props) {
  const id = patternId ?? `honeycomb-${Math.random().toString(36).slice(2)}`;

  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <pattern id={id} width="24" height="21" patternUnits="userSpaceOnUse">
          <path
            d="M12 1l10 5.5v11L12 23 2 17.5v-11L12 1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${id})`} />
    </svg>
  );
}
