import clsx from 'clsx';
import type { IconConfig } from '@/components/ui/icon/Icon';
import { Icon } from '@/components/ui/icon/Icon';

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
    <label className={clsx('flex min-h-12 w-full flex-row items-center bg-secondary-03 py-1', isRounded && 'rounded-lg', className)}>
      <div className="flex w-full flex-row items-center gap-2.5 px-2">
        <div className="flex w-auto items-center justify-center">
          <Icon className="text-primary-02" iconConfig={iconConfig} />
        </div>
        <div className="w-full px-4 pl-1">
          <input
            className="w-full description-1/primary-02 placeholder:hinttext-2/primary-03
              focus-visible:border-none focus-visible:outline-none"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>
    </label>
  );
}
