import type { MouseEvent, PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { IconConfig } from '@/shared/ui/icon/Icon';
import { Icon } from '@/shared/ui/icon/Icon';
import './Menu.scss';

export type MenuOption = {
  iconConfig: IconConfig;
  title: string;
  action: (event: MouseEvent<HTMLButtonElement>) => void;
};

type SharpCornerStyle = 'None' | 'Top-Right' | 'Top-Left' | 'Bottom-Right' | 'Bottom-Left';
type MenuPosition = 'Top-Left' | 'Top-Center' | 'Top-Right' | 'Bottom-Left' | 'Bottom-Center' | 'Bottom-Right';

type MenuProps = PropsWithChildren<{
  menuOptions: MenuOption[];
  sharpCornerStyle?: SharpCornerStyle;
  menuPosition?: MenuPosition;
}>;

function getSharpCornerStyle(sharpCornerStyle: SharpCornerStyle) {
  switch (sharpCornerStyle) {
    case 'Top-Left':
      return 'rounded-b-lg rounded-tr-lg';
    case 'Top-Right':
      return 'rounded-b-lg rounded-tl-lg';
    case 'Bottom-Left':
      return 'rounded-t-lg rounded-br-lg';
    case 'Bottom-Right':
      return 'rounded-t-lg rounded-bl-lg';
    case 'None':
    default:
      return 'rounded-lg';
  }
}

function getMenuPosition(menuPosition: MenuPosition) {
  switch (menuPosition) {
    case 'Top-Left':
      return 'bottom-full right-0';
    case 'Top-Center':
      return 'bottom-full left-1/2 -translate-x-1/2';
    case 'Top-Right':
      return 'bottom-full left-0';
    case 'Bottom-Left':
      return 'top-full right-0';
    case 'Bottom-Right':
      return 'top-full left-0';
    case 'Bottom-Center':
    default:
      return 'top-full left-1/2 -translate-x-1/2';
  }
}

export function Menu({
  children,
  menuOptions,
  sharpCornerStyle = 'None',
  menuPosition = 'Bottom-Center',
}: MenuProps) {
  const [show, setShow] = useState(false);
  const positionClassName = useMemo(() => getMenuPosition(menuPosition), [menuPosition]);
  const cornerClassName = useMemo(() => getSharpCornerStyle(sharpCornerStyle), [sharpCornerStyle]);

  return (
    <div className="relative flex h-min w-min flex-row" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {show && (
        <div className={clsx('menu__content absolute z-50 py-3.5', positionClassName)}>
          <div className={clsx('flex h-auto w-64 flex-col items-center overflow-clip bg-secondary-04 shadow-2xl', cornerClassName)}>
            {menuOptions.map((option, index) => (
              <div className="w-full" key={`${option.title}-${index}`}>
                <button
                  type="button"
                  className="flex min-h-12 w-full flex-row items-center gap-2.5 p-2.5 
                    hinttext-2/primary-02 transition-colors duration-200 ease-in-out 
                    hover:bg-secondary-03 active:bg-secondary-02"
                  onClick={option.action}
                >
                  <Icon className="h-8 w-8" iconConfig={option.iconConfig} />
                  <span>{option.title}</span>
                </button>
                {index < menuOptions.length - 1 && (
                  <div className="w-full px-2.5">
                    <hr className="h-px border-0 bg-primary-03" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
