import clsx from 'clsx';
import type { IconConfig } from '@/shared/ui/icon/Icon';
import { Icon } from '@/shared/ui/icon/Icon';

type TextInputProps = {
  className?: string;
  iconConfig: IconConfig;
  isRounded?: boolean;
  placeholder?: string;
};

export function TextInput({
  className,
  iconConfig,
  isRounded = true,
  placeholder = 'Placeholder example',
}: TextInputProps) {
  return (
    <label className={clsx('flex min-h-12 w-full flex-row items-center bg-secondary-400 py-1', isRounded && 'rounded-lg', className)}>
      <div className="flex w-full flex-row items-center gap-2.5 px-2">
        <div className="flex w-auto items-center justify-center">
          <Icon className="text-primary-500" iconConfig={iconConfig} />
        </div>
        <div className="w-full px-4 pl-1">
          <input
            className="w-full text-primary-500 placeholder:text-primary-300 focus-visible:border-none focus-visible:outline-none"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>
    </label>
  );
}
