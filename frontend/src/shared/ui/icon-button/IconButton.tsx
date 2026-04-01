import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import type { IconConfig } from '@/shared/ui/icon/Icon';
import { Icon } from '@/shared/ui/icon/Icon';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    iconConfig: IconConfig;
  }
>;

export function IconButton({ children, className, iconConfig, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={[
        'flex items-center justify-between gap-2 rounded-lg px-2 py-2 font-medium text-primary-500',
        'hover:bg-secondary-400 active:bg-secondary-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Icon iconConfig={iconConfig} />
      {children}
    </button>
  );
}
