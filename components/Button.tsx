import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60';

  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary:
      'bg-honey-500 text-neutral-900 shadow-sm hover:bg-honey-400 focus:outline-none focus:ring-2 focus:ring-honey-400/70 focus:ring-offset-2 focus:ring-offset-pollen-cream',
    ghost:
      'bg-transparent text-neutral-800 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-pollen-cream'
  };

  return <button className={[base, variants[variant], className].filter(Boolean).join(' ')} {...props} />;
}
